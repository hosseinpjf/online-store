import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

import { deletePost, getPost, getProfile } from 'services/user';

import Loader from 'components/modules/Loader';

function PostPage() {
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['post', params.id],
        queryFn: getPost
    });
    console.log(data);

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    })

    const { mutate } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            toast.success('پست با موفقیت حذف شد');
            navigate(-1);
            ['my-post-list', 'posts-list'].forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
        },
        onError: () => {
            toast.error('حذف پست به مشکل خورد لطفا دوباره تلاش کنید');
        }
    })

    if (isLoading) return <Loader />;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px', minHeight: '70dvh', padding: '40px' }}>
            <button onClick={() => navigate(-1)}>برگشت</button>
            {!!data?.post.images.length ?
                (data.post.images.map(image => (
                    <img
                        key={image}
                        width='200px'
                        src={`${import.meta.env.VITE_BASE_URL}/${image}`}
                        alt=""
                        onError={e => e.target.src = '/not-found.png'}
                    />
                ))) : (
                    <img src='/not-found.png' width='200px' />
                )
            }
            <h4>{data?.post.options.title}</h4>
            <p>{data?.post.options.content}</p>
            <p>{data?.post.options.city}</p>
            <p>{data?.post.userMobile} شماره تلفن جهت تماس</p>

            {profile?.role == 'ADMIN' && <button onClick={() => mutate(data.post._id)}>حذف پست</button>}
        </div>
    )
}

export default PostPage