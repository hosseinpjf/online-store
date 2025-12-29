import { useState } from 'react'

import SendOtpForm from 'components/templates/sendOtpForm';
import CheckOtpForm from 'components/templates/CheckOtpForm';

import styles from './authPage.module.css';

function AuthPage() {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [code, setCode] = useState("");

    return (
        <div className={`${styles.container} position-relative overflow-hidden d-flex align-items-center justify-content-center px-4`}>
            {step === 1 && <SendOtpForm setStep={setStep} setMobile={setMobile} mobile={mobile} />}
            {step === 2 && <CheckOtpForm code={code} setCode={setCode} mobile={mobile} setStep={setStep} />}
        </div>
    )
}

export default AuthPage