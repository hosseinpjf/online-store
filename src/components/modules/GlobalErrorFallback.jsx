import { useNavigate } from "react-router-dom"

function GlobalErrorFallback({ setShowError }) {
    const navigate = useNavigate();

    const refreshHandler = () => {
        navigate('/');
        window.location.reload()
    }

    return (
        <div style={{ padding: '100px 20px 0' }}>
            <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#a58e9a', position: 'relative' }}>
                <div style={{ position: 'relative', zIndex: '1' }}>
                    <h1 style={{ textAlign: 'center' }}>مشکلی پیش آمده</h1>
                    <p style={{ textAlign: 'center', margin: '20px 0 30px' }}>در ارتباط با سرور خطایی رخ داده است. لطفاً دوباره تلاش کنید.</p>
                    <button onClick={refreshHandler} style={{ margin: '0 auto', display: 'block', padding: '10px 20px', cursor: 'pointer' }}>بارگذاری مجدد</button>
                </div>
                <span style={{ position: 'absolute', top: '60%', left: '50%', zIndex: '0', color: 'rgba(255, 255, 255, 0.1)', fontSize: '200px', fontWeight: 'bolder', transform: 'translate(-50%, -50%)' }}>500</span>
            </div>
        </div>
    )
}

export default GlobalErrorFallback