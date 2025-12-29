import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

import styles from './globalErrorFallback.module.css';

function GlobalErrorFallback() {
    const navigate = useNavigate();

    const refreshHandler = () => {
        navigate('/', { replace: true });
        window.location.reload()
    }

    return (
        <div className={`${styles.container} mx-4 d-flex align-items-center`}>
            <div className="bg-error w-100 mx-auto p-4 position-relative rounded-3">
                <div className="position-relative z-1">
                    <h1 className="text-center color-side-text">مشکلی پیش آمده</h1>
                    <p className="text-center my-3 mx-4 color-side-text">در ارتباط با سرور خطایی رخ داده است! لطفاً دوباره تلاش کنید.</p>
                    <Button onClick={refreshHandler} className="mx-auto d-block py-2 px-3 cursor-pointer bg-transparent color-success border-success">بارگذاری مجدد</Button>
                </div>
            </div>
        </div>
    )
}

export default GlobalErrorFallback