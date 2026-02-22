import { useMutation, useQuery } from "@tanstack/react-query";
import { Permission, Role } from "appwrite";
import { databases, ID } from "configs/appwrite";

const databaseId = import.meta.env.VITE_DATABASE_ID;
const collectionId = 'categories';

const useAddCategory = () => {
    return useMutation({
        mutationFn: async data => {
            return await databases.createDocument({
                databaseId,
                collectionId,
                documentId: ID.unique(),
                data,
                // permissions: [
                //     Permission.read(Role.any()),
                //     Permission.create(Role.role("admin")),
                //     Permission.update(Role.role("admin")),
                //     Permission.delete(Role.role("admin")),
                // ],
            })
        }
    })
}

const useGetCategory = () => {
    return useQuery({
        queryKey: ['list-category'],
        queryFn: async () => {
            return await databases.listDocuments({
                collectionId,
                databaseId,
            })
        }
    })
}

const useDeleteCategory = () => {
    return useMutation({
        mutationFn: async id => {
            return await databases.deleteDocument({
                collectionId,
                databaseId,
                documentId: id
            })
        }
    })
}


export { useAddCategory, useGetCategory, useDeleteCategory };