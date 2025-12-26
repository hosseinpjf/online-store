import { Link, useLocation, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Ratio } from "react-bootstrap";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi"
import { RiAdminLine } from "react-icons/ri";
import { TiPlusOutline } from "react-icons/ti";
import { CgMenu } from "react-icons/cg";

import { deleteCookie, getCookie } from "utils/cookie"
import { getProfile } from "services/user";
import useStore from "store/store";

import styles from "./header.module.css"

function Header() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const refreshToken = getCookie('refreshToken');
    const { setShowOffcanvas } = useStore();
    const location = useLocation();

    const { data, isError } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    })

    const signOutHandler = () => {
        navigate('/');
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        // برای این که داده های این کلید پاک بشه و تمام کامپوننت های استفاده کننده از این درخواست در لحظه ری رندر بشن
        queryClient.setQueryData(['profile'], null);
    }

    return (
        <header className={`${styles.header} bg-side position-sticky top-0 border-bottom border-neutral d-flex gap-3 align-items-center justify-content-between px-3 px-md-4`}>
            {location.pathname == '/' && (
                <div className="d-xl-none">
                    <Button onClick={() => setShowOffcanvas(true)} className="bg-transparent border-0 p-0">
                        <CgMenu fontSize="28px" />
                    </Button>
                </div>
            )}
            <Ratio aspectRatio="1x1" className={`${styles.headerLogo} overflow-hidden`}>
                <Link to='/' className="w-100 h-100">
                    <img src="logo.png" alt="" className="image-fit" />
                </Link>
            </Ratio>
            <div className="btn-group gap-2">
                {data?.role == 'ADMIN' && (
                    <Button className="bg-transparent p-0 border-neutral bg-neutral rounded-2 color-side-svg">
                        <Link to='/admin' className="p-1 px-sm-3 py-sm-2">
                            <RiAdminLine fontSize="22px" />
                            <span className="me-2 d-none d-sm-inline color-side-text fw-light">پنل ادمین</span>
                        </Link>
                    </Button>
                )}
                {refreshToken && !isError ? (
                    <Button onClick={signOutHandler} className="bg-transparent p-1 px-sm-3 py-sm-2 border-neutral rounded-2">
                        <BiLogOutCircle fontSize="22px" />
                        <span className="me-2 d-none d-sm-inline fw-light">خروج</span>
                    </Button>
                ) : (
                    <Button className="bg-transparent p-0 border-neutral rounded-2">
                        <Link to='/auth' className="p-1 px-sm-3 py-sm-2">
                            <BiLogInCircle fontSize="22px" />
                            <span className="me-2 d-none d-sm-inline fw-light">ورود</span>
                        </Link>
                    </Button>
                )}
                <Button className="bg-transparent p-0 border-link bg-link rounded-2 color-side-svg">
                    <Link to='/dashboard' className="p-1 px-sm-3 py-sm-2">
                        <TiPlusOutline fontSize="22px" />
                        <span className="me-2 d-none d-sm-inline color-side-text fw-light">ثبت آگهی</span>
                    </Link>
                </Button>
            </div>
        </header >
    )
}

export default Header