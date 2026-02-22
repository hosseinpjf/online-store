import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Accordion, Button, FloatingLabel, Form } from "react-bootstrap";
import DOMPurify from 'dompurify';

import { useAddCategory } from "services/admin";

import icons from "constants/icons";

import "styles/form.css"

function CategoryForm() {
    const [form, setForm] = useState({ name: "", slug: "", icon: "" });
    const queryClient = useQueryClient();
    const { mutate, isPending } = useAddCategory();

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!form.name || !form.slug || !form.icon) {
            toast.error('لطفا فیلد ها را پر کنید', { id: 'CheckFieldsComplete' })
            return
        };

        const slugRegex = /^[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)*$/;
        if (!slugRegex.test(form.slug)) {
            toast.error('اسلاگ نامعتبر است! فقط حروف انگلیسی، اعداد و خط فاصله مجاز هستند', { id: 'slugValidation' });
            return
        }

        const safeData = {
            ...form,
            name: DOMPurify.sanitize(form.name),
            slug: DOMPurify.sanitize(form.slug),
        }
        const checkForm = Object.keys(form).every(key => safeData[key] === form[key]);
        if (!checkForm) {
            toast.error('ورودی مشکوک شناسایی شد!');
            return
        }

        mutate(safeData, {
            onSuccess: () => {
                toast.success('دسته بندی جدید با موفقیت اضافه شد');
                queryClient.invalidateQueries({ queryKey: ['list-category'] });
            },
            onError: () => toast.error('اضافه شدن دسته بندی جدید با مشکل مواجه شد'),
        });
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
                        <Form.Control
                            type="text"
                            name='name'
                            value={form.name}
                            onChange={changeHandler}
                            placeholder=""
                            className='px-3 bg-surface border-1 border-neutral fw-light'
                        />
                    </FloatingLabel>
                </div>
                <div className='flex-grow-1 h-100'>
                    <FloatingLabel
                        label="اسلاگ"
                        className="h-100 px-0"
                    >
                        <Form.Control
                            type="text"
                            name='slug'
                            value={form.slug}
                            onChange={changeHandler}
                            placeholder=""
                            inputMode="latin"
                            className='px-3 bg-surface border-1 border-neutral fw-light direction-ltr'
                        />
                    </FloatingLabel>
                </div>
            </div>
            <div className='w-100 my-2 my-md-3 my-xl-4'>
                <Accordion>
                    <Accordion.Item eventKey="0" className="bg-surface overflow-hidden border-1 border-neutral">
                        <Accordion.Header className="color-secondary">آیکون مورد نظر  را انخاب کنید</Accordion.Header>
                        <Accordion.Body className="w-100 px-4 pb-5 px-sm-5">
                            <div className="d-flex flex-wrap gap-3 justify-content-between">
                                {Object.entries(icons).map(([key, Icon]) => (
                                    <Button
                                        key={key}
                                        className={`${key == form.icon ? 'bg-accent border-accent' : 'bg-transparent'} bg-transparent border-link`}
                                        onClick={() => setForm(prevForm => ({ ...prevForm, icon: key }))}
                                    >
                                        <Icon fontSize="22px" />
                                    </Button>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <Button type='submit' disabled={isPending} className='w-100 bg-surface color-accent border-2 py-2 rounded-2 border-accent'>ایجاد</Button>
        </form>
    )
}

export default CategoryForm