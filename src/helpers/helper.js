const requestHandler = async fn => {
    try {
        return (await fn()).data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            error.response?.statusText ||
            error.message ||
            "Request failed"
        );
    }
}

export { requestHandler }