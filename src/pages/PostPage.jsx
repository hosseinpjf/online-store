import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Button, Carousel, Ratio } from 'react-bootstrap';
import { IoMdArrowRoundBack } from "react-icons/io";

import { deletePost, getPost, getProfile } from 'services/user';

import Loader from 'components/modules/Loader';

import styles from './postPage.module.css';

function PostPage() {
    const params = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [index, setIndex] = useState(0);

    const { data, isLoading } = useQuery({
        queryKey: ['post', params.id],
        queryFn: getPost,
        select: data => {
            const newImages = [data.post.images[data.post.options.mainPhoto], ...data.post.images.filter((img) => img != data.post.images[data.post.options.mainPhoto])];
            return { ...data.post, images: newImages }
        }
    });

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
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
        <div className="py-4 px-2 px-sm-3 px-md-4 py-md-5">
            <div className='d-flex justify-content-between align-items-start gap-1 gap-sm-3 w-100 mb-3'>
                <h4 className='m-0 pt-2 lh-base'>{data.options.title}</h4>
                <Button onClick={() => navigate(-1)} className='bg-transparent border-0'>
                    <IoMdArrowRoundBack size="22px" />
                </Button>
            </div>
            <div className={`${styles.main} d-flex flex-column flex-md-row-reverse row-gap-3 column-gap-5`}>
                <div>
                    <div className={`${styles.parentCarousel} mx-auto`}>
                        {!!data.images.length ? (
                            <Carousel activeIndex={index} onSelect={selectedIndex => setIndex(selectedIndex)}>
                                {data.images.map(image => (
                                    <Carousel.Item key={image}>
                                        <Ratio aspectRatio="16x9" className='w-100'>
                                            <img
                                                className='image-fit rounded-3'
                                                src={`${import.meta.env.VITE_BASE_URL}/${image}`}
                                                onError={e => e.target.src = '/not-found.png'}
                                            />
                                        </Ratio>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        ) : (
                            <Ratio aspectRatio="16x9" className='w-100'>
                                <img src='/not-found.png' className='image-fit rounded-3' />
                            </Ratio>
                        )}
                        <div className='mt-4'>
                            <p className='mb-2'>منطقه : {data.options.city || "ثبت نشده"}</p>
                            <p className='mb-2'>شماره تلفن جهت تماس : {data.userMobile}</p>
                            <p className='mb-0'>ارسال شده در تاریخ : {new Date(data.createdAt).toLocaleDateString("fa-IR")}</p>
                        </div>
                    </div>
                </div>

                <div className={`${!data.options.content ? 'align-self-center' : null} mt-1 mt-md-0`}>
                    {data.options.content ? <p className='lh-lg'>{data.options.content}</p> : <p className='text-center color-error'>برای این پست متن توضیحاتی ثبت نشده</p>}
                </div>
            </div>

            {profile?.role == 'ADMIN' && (
                <div className={`${styles.deletePost} position-sticky d-flex justify-content-end`}>
                    <Button className='bg-error border-0' onClick={() => mutate(data._id)}>حذف پست</Button>
                </div>
            )}
        </div>
    )
}

export default PostPage