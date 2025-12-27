import { useState } from "react";
import toast from "react-hot-toast";
import { Button, FloatingLabel, Form } from "react-bootstrap";

import { sendOtp } from "services/auth";

function SendOtpForm({ setStep, setMobile, mobile }) {
    const [clicked, setClicked] = useState(false);

    const sendHandler = async e => {
        e.preventDefault();
        if (mobile.length != 11) {
            toast.error('تعداد ارقام شماره درست نمی باشد', {id: 'mobileNumbers'})
            return
        };

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
        <form onSubmit={sendHandler} className="p-3 rounded-4">
            <h3 className="mb-3">ورود به حساب کاربری</h3>
            <p className="mb-3 fw-light">برای استفاده از امکانات برنامه لطفا شماره موبایل خود را وارد کنید. کد تایید به این شماره پیامک خواهد شد</p>

            <FloatingLabel
                label="شماره موبایل خود را وارد کنید"
                className="mb-3 px-0"
            >
                <Form.Control
                    type="number"
                    onChange={e => setMobile(e.target.value)}
                    value={mobile}
                    className='w-100 px-3 bg-transparent rounded-2 border-1 border-disabled fw-light'
                    placeholder=""
                />
            </FloatingLabel>

            <Button type='submit' className="bg-transparent color-accent border-accent rounded-2" disabled={clicked}>
                {clicked ? 'درحال ارسال...' : 'ارسال کد تایید'}
            </Button>
        </form>
    )
}

export default SendOtpForm