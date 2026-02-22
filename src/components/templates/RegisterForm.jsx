import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

import { useRegister } from "services/auth";

function RegisterForm({ setStep }) {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();
    const { mutate, isPending } = useRegister();
    const queryClient = useQueryClient();

    const submitHandler = e => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            toast.error('لطفا تمام فیلد ها را پر کنید', { id: 'checkFildsRegister' });
            return
        };
        mutate(form, {
            onSuccess: () => {
                toast.success('ثبت نام شما با موفقیت انجام شد', { id: 'successRegister' });
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                navigate('/dashboard');
            },
            onError: () => toast.error('ثبت نام شما با مشکل مواجه شد لطفا دباره تلاش کنید', { id: 'errorRegister' }),
        });
    }

    return (
        <form onSubmit={submitHandler} className="p-3 rounded-4">
            <h3 className="mb-3">ثبت نام</h3>
            <p className="mb-3 fw-light">برای استفاده از امکانات برنامه لطفا ثبت نام کنید.</p>

            <FloatingLabel
                label="نام خود را وارد کنید"
                className="mb-3 px-0"
            >
                <Form.Control
                    type="text"
                    onChange={e => setForm(prevForm => ({ ...prevForm, name: e.target.value }))}
                    value={form.name}
                    className='w-100 px-3 bg-transparent rounded-2 border-1 border-disabled fw-light'
                    placeholder=""
                />
            </FloatingLabel>
            <FloatingLabel
                label="ایمیل خود را وارد کنید"
                className="mb-3 px-0"
            >
                <Form.Control
                    type="text"
                    onChange={e => setForm(prevForm => ({ ...prevForm, email: e.target.value }))}
                    value={form.email}
                    className='w-100 px-3 bg-transparent rounded-2 border-1 border-disabled fw-light'
                    placeholder=""
                />
            </FloatingLabel>
            <FloatingLabel
                label="پسورد خود را وارد کنید"
                className="mb-3 px-0"
            >
                <Form.Control
                    type="text"
                    onChange={e => setForm(prevForm => ({ ...prevForm, password: e.target.value }))}
                    value={form.password}
                    className='w-100 px-3 bg-transparent rounded-2 border-1 border-disabled fw-light'
                    placeholder=""
                />
            </FloatingLabel>

            <Button type='submit' className="bg-transparent color-accent border-accent rounded-2" disabled={isPending}>
                {isPending ? 'درحال ثبت نام...' : 'ثبت نام'}
            </Button>
            <Button onClick={() => setStep(2)} className="bg-transparent color-error border-error rounded-2 me-3" disabled={isPending}>
                از قبل حساب کاربری دارید؟ وارد شوید
            </Button>
        </form>
    )
}

export default RegisterForm