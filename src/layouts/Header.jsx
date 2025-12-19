import { Link, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteCookie, getCookie } from "utils/cookie"
import { getProfile } from "services/user";

import styles from "./header.module.css"

function Header() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const refreshToken = getCookie('refreshToken');

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
        <header className={styles.header}>
            <div>
                <Link to='/'>
                    <img src="divar.svg" alt="" />
                </Link>
                <span>
                    <img src="location.svg" alt="" />
                    <span>تهران</span>
                </span>
            </div>
            <div>
                {data?.role == 'ADMIN' && <Link to='/admin' className={styles.admin}>پنل ادمین</Link>}

                {refreshToken && !isError ? (
                    <button onClick={signOutHandler} className={styles.signOut}>
                        <img src="profile.svg" alt="" />
                        <span>خروج</span>
                    </button>
                ) : (
                    <Link to='/auth' className={styles.auth}>
                        <img src="profile.svg" alt="" />
                        <span>ورود</span>
                    </Link>
                )}
                <Link to='/dashboard' className={styles.dashboard}>
                    ثبت آگهی
                </Link>
            </div>
        </header >
    )
}

export default Header