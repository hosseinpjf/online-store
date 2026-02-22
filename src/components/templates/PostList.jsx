import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

import { RiDeleteBin7Line } from "react-icons/ri";

import { useDeletePost, useGetProfile, useGetUserPosts } from "services/user";

import PostCard from "components/modules/PostCard";
import Loader from "components/modules/Loader";

function PostList() {
    const [disabledId, setDisabledId] = useState('');
    const queryClient = useQueryClient();
    const { data: profile } = useGetProfile();
    const { data, isFetching } = useGetUserPosts(profile.$id);
    const { mutate } = useDeletePost();

    const deleteHandler = id => {
        setDisabledId(id);
        mutate(id, {
            onSuccess: () => {
                ['my-post-list', 'posts-list'].forEach(key => {
                    queryClient.invalidateQueries(key)
                });
                queryClient.refetchQueries({ queryKey: ['posts-list'] });
                toast.success('پست با موفقیت حذف شد');
                setDisabledId('');
            },
            onError: () => {
                toast.error('حذف پست به مشکل خورد لطفا دوباره تلاش کنید');
                setDisabledId('');
            }
        });
    }

    return (
        <div className="mt-5">
            <h3 className="mb-4">پست های شما</h3>
            {isFetching ? <Loader /> : (
                <div className="d-flex flex-wrap gap-2 gap-sm-3 gap-lg-4 gap-xxl-5 justify-content-center justify-content-md-evenly">
                    {!!data?.documents.length ? (
                        data.documents.slice().reverse().map(post => (
                            <div key={post.$id} className="position-relative">
                                <PostCard post={post} />
                                <Button
                                    onClick={() => deleteHandler(post.$id)}
                                    disabled={disabledId == post.$id}
                                    className="position-absolute top-0 start-0 m-2 bg-error border-0 rounded-2 fw-light p-1 px-md-3 py-md-2 color-side-svg"
                                >
                                    <RiDeleteBin7Line fontSize="22px" />
                                    <span className="fw-light color-side-text d-none d-md-inline me-2">حذف پست</span>
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center color-error">شما تا کنون پستی ثبت نکرده اید</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default PostList