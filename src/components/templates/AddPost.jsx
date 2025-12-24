import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

import { getCategory } from 'services/admin'
import { addPost } from 'services/user';

import CropperImages from 'components/modules/CropperImages';

import 'styles/form.css'
import styles from './addPost.module.css'

function AddPost() {
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ title: "", content: "", amount: null, city: "", category: "", images: [] });

    const { data } = useQuery({
        queryKey: ['list-category'],
        queryFn: getCategory,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            toast.success('آگهی با موفقیت ایجاد شد');
            ['my-post-list', 'posts-list'].forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
            queryClient.refetchQueries({ queryKey: ['posts-list'] });
        },
        onError: () => toast.error('مشکلی پیش آمده'),
    })

    const changeHandler = event => {
        if (event.target.name !== "images") {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
        else {
            setForm({ ...form, [event.target.name]: [...event.target.files].map(fileImage => ({ fileImage, edited: false })) });
        }
    }

    const addHandler = async event => {
        event.preventDefault();
        if (!form.amount || !form.category) return;

        let validate = form.images?.every(image => image.edited);
        if (!validate) {
            toast.error("همه‌ی عکس‌ها باید ویرایش شده باشند", { id: 'imagesValidate' });
            return
        }

        const formData = new FormData();
        for (const item in form) {
            if (item != "images") {
                formData.append(item, form[item]);
            }
            else {
                form[item]?.forEach(image => {
                    formData.append(item, image.fileImage);
                })
            }
        }

        mutate(formData);
    }

    return (
        <form onChange={changeHandler} className={`${styles.form}`}>
            <h3>افزودن آگهی</h3>
            <div className='d-flex flex-wrap gap-3 align-items-stretch my-3'>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="عنوان"
                        className="h-100 px-0"
                    >
                        <Form.Control className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='title' placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="توضیحات"
                        className="h-100 px-0"
                    >
                        <Form.Control as="textarea" className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='content' placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="قیمت"
                        className="h-100 px-0"
                    >
                        <Form.Control className='px-3 bg-surface border-1 border-neutral fw-light' type="number" name='amount' placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="شهر"
                        className="h-100 px-0"
                    >
                        <Form.Control className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='city' placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel label="دسته بندی">
                        <Form.Select name="category" className='px-3 bg-surface cursor-pointer border-1 border-neutral fw-light'>
                            {data?.map(item => <option key={item._id} value={item._id} className='cursor-pointer fw-light'>{item.name}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </div>
                <div className="flex-grow-1 inputFile">
                    <label htmlFor="images" className='position-relative d-block bg-surface w-100 px-3 rounded-2 border border-1 border-neutral cursor-pointer'>
                        <input type="file" id='images' className='d-none' name='images' accept="image/*" multiple placeholder="" />
                        <span className='position-absolute top-0 mt-1'>عکس</span>
                        {!form.images?.length ? <span className='fw-light'>هیچ فایلی انتخاب نشده</span> : (
                            <>
                                {form.images?.length == 1 ? <span className='single-line d-block direction-ltr fw-light'>{form.images[0]?.fileImage.name}</span> : <span className='fw-light'>{`تعداد ${form.images.length} فایل انتخاب شده `}</span>}
                            </>
                        )}
                    </label>
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <CropperImages formImages={form.images} setFormImages={setForm} />
            </div>
            <Button type='submit' onClick={addHandler} disabled={isPending} className='w-100 bg-surface color-accent border-2 py-2 rounded-2 border-accent mt-3'>ایجاد</Button>
        </form>
    )
}

export default AddPost