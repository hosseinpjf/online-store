import { useMutation, useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import { account, databases, ID, storage } from "configs/appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const collectionId = 'posts';
const bucketId = import.meta.env.VITE_BUCKET_ID;

const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            return await account.get();
        }
    })
}

const useAddPost = () => {
    return useMutation({
        mutationFn: async ({ data, userId }) => {
            let images = [];
            if (data.images) {
                for (const image of data.images) {
                    const fileId = ID.unique();
                    await storage.createFile({
                        bucketId,
                        fileId,
                        file: image.fileImage,
                    });
                    images.push(fileId);
                };
            }
            return await databases.createDocument({
                databaseId,
                collectionId,
                documentId: ID.unique(),
                data: { ...data, images, createdBy: userId },
            })
        }
    })
}

const useGetUserPosts = userId => {
    return useQuery({
        queryKey: ['my-post-list', userId],
        queryFn: async () => {
            return await databases.listDocuments({
                collectionId,
                databaseId,
                queries: [
                    Query.equal('createdBy', userId),
                ]
            })
        }
    })
}

const useGetImage = fileId => storage.getFileView({ bucketId, fileId });

const useDeletePost = () => {
    return useMutation({
        mutationFn: async id => {
            const getPost = await databases.getDocument({
                collectionId,
                databaseId,
                documentId: id,
            })
            for (const image of getPost.images) {
                await storage.deleteFile({
                    bucketId,
                    fileId: image,
                })
            }
            return await databases.deleteDocument({
                collectionId,
                databaseId,
                documentId: id,
            })
        }
    })
}

const useGetAllPosts = () => {
    return useQuery({
        queryKey: ['posts-list'],
        queryFn: async () => {
            return await databases.listDocuments({
                collectionId,
                databaseId,
            })
        }
    })
}

const useGetPost = postId => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: async () => {
            return await databases.getDocument({
                collectionId,
                databaseId,
                documentId: postId,
            })
        },
        select: data => {
            const newImages = [data.images[data.mainphoto], ...data.images.filter((img) => img != data.images[data.mainphoto])];
            return { ...data, images: newImages }
        },
    })
}

export { useGetProfile, useAddPost, useGetUserPosts, useGetImage, useDeletePost, useGetAllPosts, useGetPost }