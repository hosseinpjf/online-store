import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { reactQueryOptions } from "configs/reactQuery";

import Layout from "layouts/Layout";
import Router from "router/Router";

const queryClient = new QueryClient(reactQueryOptions);

function App() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout setShowOffcanvas={setShowOffcanvas}>
          <Router showOffcanvas={showOffcanvas} />
          <Toaster />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
