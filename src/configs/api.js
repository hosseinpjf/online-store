import axios from "axios";

import { getCookie, setCookie } from "utils/cookie";
import { getNewTokens } from "services/token";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
    request => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            request.headers['Authorization'] = `bearer ${accessToken}`;
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        const refreshToken = getCookie('refreshToken');
        const orginalRequest = error.config;
        if (error.response?.status == 401 && !orginalRequest._retry && refreshToken) {
            orginalRequest._retry = true;

            try {
                const res = await getNewTokens(refreshToken);
                setCookie(res);
                return api(orginalRequest);
            } catch (err) {
                toast.error('ورود به حساب کاربری شما با مشکل مواجه شد لطفا دوباره لاگین کنید', { id: 'getNewToken' });
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
)

export { api };