import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { deletePost, getUserPosts } from "services/user";

import Loader from "components/modules/Loader";

import styles from "./postList.module.css";

function PostList() {
    const [disabledId, setDisabledId] = useState('');
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({ queryKey: ['my-post-list'], queryFn: getUserPosts });

    const { mutate } = useMutation({
        mutationFn: deletePost,
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
    })

    const deleteHandler = id => {
        setDisabledId(id);
        mutate(id);
    }

    return (
        <div className={styles.list}>
            <h3>آگهی های شما</h3>
            {isLoading ? <Loader /> : (
                <ul>
                    {data?.posts.slice().reverse().map(post => (
                        <li key={post._id}>
                            <Link to={`/post/${post._id}`} onClick={() => window.scrollTo(0, 0)}>
                                <img
                                    src={`${import.meta.env.VITE_BASE_URL}/${post.images[0]}`}
                                    onError={(e) => e.target.src = 'not-found.png'}
                                    alt=""
                                />
                                <div className={styles.title}>
                                    <p>{post.options.title}</p>
                                    <p>{post.options.content}</p>
                                </div>
                                <div className={styles.price}>
                                    <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                                    <p>{post.amount.toLocaleString("fa-IR")} تومان</p>
                                </div>
                            </Link>
                            <button onClick={() => deleteHandler(post._id)} disabled={disabledId == post._id}>حذف آگهی</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default PostList