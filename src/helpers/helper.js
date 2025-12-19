const requestHandler = async fn => {
    try {
        console.log("request: ", fn);
        return (await fn()).data;
    } catch (error) {
        console.log("error");
        throw new Error(
            error.response?.data?.message ||
            error.response?.statusText ||
            error.message ||
            "Request failed"
        );
    }
}

export { requestHandler }