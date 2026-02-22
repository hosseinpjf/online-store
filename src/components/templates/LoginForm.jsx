import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

import { useLogin } from 'services/auth';

function LoginForm({ setStep }) {
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();
    const queryClient = useQueryClient();

    const submitHandler = e => {
        e.preventDefault();
        if (!form.email || !form.password) {
            toast.error('لطفا تمام فیلد ها را پر کنید', { id: 'checkFildsLogin' });
            return
        };
        mutate(form, {
            onSuccess: () => {
                toast.success('ورود شما با موفقیت انجام شد', { id: 'successLogin' });
                queryClient.invalidateQueries({ queryKey: ['profile'] });
                navigate('/dashboard');
            },
            onError: (error) => {
                toast.error('ورود شما با مشکل مواجه شد لطفا دباره تلاش کنید', { id: 'errorLogin' });
                console.log(error);
            }
        });
    }

    return (
        <form onSubmit={submitHandler} className="p-3 rounded-4">
            <h3 className='mb-3'>ورود</h3>
            <p className="mb-3 fw-light">برای استفاده از امکانات برنامه لطفا وارد شوید.</p>

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

            <Button type='submit' className='bg-transparent color-accent border-accent rounded-2' disabled={isPending}>
                {isPending ? 'درحال ورود...' : 'ورود'}
            </Button>
            <Button onClick={() => setStep(1)} className='bg-transparent color-error border-error me-3 rounded-2'>
                حساب کاربری ندارید؟ ثبت نام کنید
            </Button>
        </form>
    )
}

export default LoginForm