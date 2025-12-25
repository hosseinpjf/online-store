import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Button, FloatingLabel, Form } from "react-bootstrap";

import { addCategory } from "services/admin";

import "styles/form.css"

function CategoryForm() {
    const [form, setForm] = useState({ name: "", slug: "", icon: "" });
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            toast.success('دسته بندی جدید با موفقیت اضافه شد');
            queryClient.invalidateQueries('list-category');
        },
        onError: () => toast.error('اضافه شدن دسته بندی جدید با مشکل مواجه شد')
    });


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!form.name || !form.slug || !form.icon) {
            toast.error('لطفا فیلد ها را پر کنید', { id: 'CheckFieldsComplete' })
            return
        };

        mutate(form);
        setForm({ name: "", slug: "", icon: "" });
    }

    return (
        <form onSubmit={submitHandler} className="mt-5">
            <h3 className="mb-4">ایجاد دسته بندی جدید</h3>
            <div className="d-flex flex-wrap gap-2 gap-md-3 gap-xl-4 align-items-stretch">
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="اسم دسته بندی"
                        className="h-100 px-0"
                    >
                        <Form.Control className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='name' value={form.name} onChange={changeHandler} placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="اسلاگ"
                        className="h-100 px-0"
                    >
                        <Form.Control className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='slug' value={form.slug} onChange={changeHandler} placeholder="" />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="آیکون"
                        className="h-100 px-0"
                    >
                        <Form.Control className='px-3 bg-surface border-1 border-neutral fw-light' type="text" name='icon' value={form.icon} onChange={changeHandler} placeholder="" />
                    </FloatingLabel>
                </div>
                <Button type='submit' disabled={isPending} className='w-100 bg-surface color-accent border-2 py-2 rounded-2 border-accent'>ایجاد</Button>
            </div>
        </form>
    )
}

export default CategoryForm