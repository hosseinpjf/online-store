import { useState } from 'react'

import RegisterForm from 'components/templates/RegisterForm';
import LoginForm from 'components/templates/LoginForm';

import styles from './authPage.module.css';

function AuthPage() {
    const [step, setStep] = useState(1);

    return (
        <div className={`${styles.container} position-relative overflow-hidden d-flex align-items-center justify-content-center px-4`}>
            {step === 1 && <RegisterForm setStep={setStep} />}
            {step === 2 && <LoginForm setStep={setStep} />}
        </div>
    )
}

export default AuthPage