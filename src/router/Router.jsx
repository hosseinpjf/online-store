import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import { useGetProfile } from "services/user"

import AdminPage from "pages/AdminPage"
import AuthPage from "pages/AuthPage"
import DashboardPage from "pages/DashboardPage"
import HomePage from "pages/HomePage"
import NotFoundPage from "pages/NotFoundPage"
import PostPage from "pages/PostPage"
import GlobalErrorFallback from "components/modules/GlobalErrorFallback"
import Loader from "components/modules/Loader"

function Router() {
    const [showError, setShowError] = useState(false);
    const queryClient = useQueryClient();
    const { data, isFetching } = useGetProfile();

    useEffect(() => {
        const unsubscribe = queryClient.getQueryCache().subscribe(event => {
            if (event?.query?.state?.status === 'error' && ["posts-list", "list-category", "post"].includes(event.query.queryKey[0])) {
                setShowError(true);
            }
        });
        return () => unsubscribe();
    }, []);

    if (isFetching) return <Loader />;
    return (
        <Routes>
            {showError ? (
                <Route path="/*" element={<GlobalErrorFallback />} />
            ) : (
                <>
                    <Route index element={<HomePage />} />
                    <Route path="post/:id" element={<PostPage />} />
                    <Route path="/auth" element={data ? <Navigate to='/dashboard' /> : <AuthPage />} />
                    <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate to='/auth' />} />
                    <Route path="/admin" element={data?.labels[0] == 'admin' ? <AdminPage /> : <Navigate to='/' />} />
                    <Route path="/*" element={<NotFoundPage />} />
                </>
            )}
        </Routes>
    )
}

export default Router