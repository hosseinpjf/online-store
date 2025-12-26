import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

import { checkOtp } from 'services/auth';
import { setCookie } from 'utils/cookie';
import { getProfile } from 'services/user';

function CheckOtpForm({ code, setCode, mobile, setStep }) {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const { refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        enabled: false
    })

    const submitHandler = async (event) => {
        event.preventDefault();
        if (code.length != 5) return;

        setClicked(true);
        try {
            const data = await checkOtp(mobile, code);
            setCookie(data);
            refetch();
            navigate('/');
        } catch (error) {
            toast.error('مشکلی پیش آمده');
            setClicked(false);
        }
    }

    return (
        <form onSubmit={submitHandler} className="p-3 rounded-4">
            <h3 className='mb-3'>تایید کد ارسال شده</h3>
            <p className='mb-3'>کد پیامک شده به شماره «{mobile}» را وارد کنید</p>

            <FloatingLabel
                label="کد تایید را وارد کنید"
                className="mb-3 px-0"
            >
                <Form.Control
                    type="number"
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    className='w-100 px-3 bg-transparent rounded-2 border-1 border-disabled fw-light'
                    placeholder=""
                />
            </FloatingLabel>

            <Button type='submit' className='bg-transparent color-accent border-accent rounded-2' disabled={clicked}>
                {clicked ? 'درحال چک...' : 'ورود'}
            </Button>
            <Button onClick={() => setStep(1)} className='bg-transparent color-error border-error me-3 rounded-2'>تغییر شماره تلفن</Button>
        </form>
    )
}

export default CheckOtpForm