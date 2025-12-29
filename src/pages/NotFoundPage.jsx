import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-4 d-flex align-items-center" style={{ height: 'calc(100dvh - 70px - 60px)' }}>
      <div className="w-100 mx-auto p-4 bg-error rounded-3" style={{ maxWidth: '500px' }}>
        <p className="text-center m-0 color-side-text">مسیری که آن را دنبال کرده اید وجود ندارد</p>
        <Button onClick={() => navigate('/', { replace: true })} className="bg-transparent mx-auto d-block mt-3 color-success border-success">برگشتن به صفحه اصلی</Button>
      </div>
    </div>
  )
}

export default NotFoundPage