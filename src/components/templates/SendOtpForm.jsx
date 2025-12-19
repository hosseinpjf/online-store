import toast from "react-hot-toast";

import { sendOtp } from "services/auth";

import styles from './sendOtpForm.module.css';
import { useState } from "react";

function SendOtpForm({ setStep, setMobile, mobile }) {
    const [clicked, setClicked] = useState(false);

    const sendHandler = async e => {
        e.preventDefault();
        if (mobile.length != 11) return;

        setClicked(true);
        try {
            await sendOtp(mobile);
            setStep(2);
        } catch (error) {
            toast.error('مشکلی پیش آمده');
            setClicked(false);
        }
    }

    return (
        <form onSubmit={sendHandler} className={styles.form}>
            <h3>ورود به حساب کاربری</h3>
            <p>برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید. کد تایید به این شماره پیامک خواهد شد</p>
            <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
            <input type="text" value={mobile} id='input' onChange={e => setMobile(e.target.value)} placeholder='شماره موبایل' />
            <button type='submit' disabled={clicked}>
                {clicked ? 'درحال ارسال...' : 'ارسال کد تایید'}
            </button>
        </form>
    )
}

export default SendOtpForm