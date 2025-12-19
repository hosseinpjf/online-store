import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { checkOtp } from 'services/auth';
import { setCookie } from 'utils/cookie';
import { getProfile } from 'services/user';

import styles from './checkOtpForm.module.css';

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
        <form onSubmit={submitHandler} className={styles.form}>
            <h3>تایید کد ارسال شده</h3>
            <p>کد پیامک شده به شماره "{mobile}" را وارد کنید</p>
            <label htmlFor="input">کد تایید را وارد کنید</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} id='input' placeholder='کد تایید' />
            <button type='submit' disabled={clicked}>
                {clicked ? 'درحال چک...' : 'ورود'}
            </button>
            <button onClick={() => setStep(1)}>تغییر شماره تلفن</button>
        </form>
    )
}

export default CheckOtpForm