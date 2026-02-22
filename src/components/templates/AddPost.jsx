import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import DOMPurify from 'dompurify'

import { useGetCategory } from 'services/admin'
import { useAddPost, useGetProfile } from 'services/user';

import CropperImages from 'components/modules/CropperImages';

import 'styles/form.css'

function AddPost() {
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ title: "", content: "", category: "", images: [], mainphoto: 0 });
    const [accordionKey, setAccordionKey] = useState(null);
    const { data } = useGetCategory();
    const { mutate, isPending } = useAddPost();
    const { data: profile } = useGetProfile();

    const changeHandler = event => {
        if (event.target.name !== "images") {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
        else {
            setForm({ ...form, [event.target.name]: [...event.target.files].map((fileImage, index) => ({ fileImage, edited: false, firstImage: index == 0 ? true : false })) });
        }
    }

    const addHandler = async event => {
        event.preventDefault();
        if (!form.category || !form.title) {
            toast.error("لطفا فیلد ها را پر کنید", { id: 'CheckFieldsComplete' });
            return
        };

        const validate = form.images?.every(image => image.edited);
        if (!validate) {
            toast.error("همه‌ی عکس‌ها باید ویرایش شده باشند", { id: 'imagesValidate' });
            return
        }

        const safeData = {
            ...form,
            title: DOMPurify.sanitize(form.title),
            content: DOMPurify.sanitize(form.content),
        }
        const checkForm = Object.keys(form).every(key => safeData[key] === form[key]);
        if (!checkForm) {
            toast.error('ورودی مشکوک شناسایی شد!');
            return
        }

        mutate({ data: safeData, userId: profile.$id }, {
            onSuccess: () => {
                toast.success('آگهی با موفقیت ایجاد شد');
                ['my-post-list', 'posts-list'].forEach(key => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                queryClient.refetchQueries({ queryKey: ['posts-list'] });
            },
            onError: (error) => {
                toast.error('مشکلی پیش آمده');
                console.log(error);
            }
        });
        setAccordionKey(null);
        setForm({ title: "", content: "", category: "", images: [], mainphoto: 0 })
    }

    return (
        <form>
            <h3 className='mb-4'>افزودن پست</h3>
            <div className='d-flex flex-wrap gap-2 gap-md-3 gap-xl-4 mb-2 mb-md-3 mb-xl-4 align-items-stretch mt-3'>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="عنوان"
                        className="h-100 px-0"
                    >
                        <Form.Control onChange={changeHandler} value={form.title} className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='title' placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="توضیحات"
                        className="h-100 px-0"
                    >
                        <Form.Control onChange={changeHandler} value={form.content} as="textarea" className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='content' placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel label="دسته بندی">
                        <Form.Select onChange={changeHandler} value={form.category} name="category" className='px-3 bg-surface cursor-pointer border-1 border-neutral fw-light'>
                            <option value="" disabled className='bg-disabled color-side-text'>انتخاب کنید</option>
                            {data?.documents.map(item => <option key={item.$id} value={item.$id} className='cursor-pointer fw-light bg-surface'>{item.name}</option>)}
                        </Form.Select>
                    </FloatingLabel>
                </div>
                <div className="flex-grow-1 inputFile">
                    <label htmlFor="images" className='position-relative d-block bg-surface w-100 px-3 rounded-2 border border-1 border-neutral cursor-pointer'>
                        <input onChange={changeHandler} type="file" id='images' className='d-none' name='images' accept="image/*" multiple placeholder="" />
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
                <CropperImages form={form} setForm={setForm} accordionKey={accordionKey} setAccordionKey={setAccordionKey} />
            </div>
            <Button type='submit' onClick={addHandler} disabled={isPending} className='w-100 bg-surface color-accent border-2 py-2 rounded-2 border-accent mt-2 mt-md-3 mt-xl-4'>
                {isPending ? 'درحال ایجاد' : 'ایجاد'}
            </Button>
        </form>
    )
}

export default AddPost