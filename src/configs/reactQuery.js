const reactQueryOptions = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            staleTime: 60 * 1000,
            retry: 1,
        }
    }
}

export { reactQueryOptions }