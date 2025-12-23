import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";
import { RiDeleteBin7Line } from "react-icons/ri";

import { deletePost, getUserPosts } from "services/user";

import PostCard from "components/modules/PostCard";
import Loader from "components/modules/Loader";

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
        <div>
            <h3>آگهی های شما</h3>
            {isLoading ? <Loader /> : (
                <div className="d-flex flex-wrap gap-2 gap-sm-3 gap-lg-4 gap-xxl-5 justify-content-center justify-content-md-evenly">
                    {data?.posts.slice().reverse().map(post => (
                        <div key={post._id} className="position-relative">
                            <PostCard post={post} />
                            <Button 
                            onClick={() => deleteHandler(post._id)}
                            disabled={disabledId == post._id}
                            className="position-absolute top-0 start-0 m-2 bg-error border-0 rounded-2 fw-light p-1 px-md-3 py-md-2 color-side-svg"
                            >
                                <RiDeleteBin7Line fontSize="22px" />
                                <span className="fw-light color-side-text d-none d-md-inline me-2">حذف آگهی</span>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PostList

// <li key={post._id}>
// <Link to={`/post/${post._id}`} onClick={() => window.scrollTo(0, 0)}>
//     <img
//         src={`${import.meta.env.VITE_BASE_URL}/${post.images[0]}`}
//         onError={(e) => e.target.src = 'not-found.png'}
//         alt=""
//     />
//     <div className={styles.title}>
//         <p>{post.options.title}</p>
//         <p>{post.options.content}</p>
//     </div>
//     <div className={styles.price}>
//         <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
//         <p>{post.amount.toLocaleString("fa-IR")} تومان</p>
//     </div>
// </Link>

// <button onClick={() => deleteHandler(post._id)} disabled={disabledId == post._id}>حذف آگهی</button>
// </li>