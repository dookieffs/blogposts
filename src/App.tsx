import React from "react";
import { Route, BrowserRouter, Routes, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header, ProtectedRoute } from "@components/index";
import { AuthContextProvider } from "@context/AuthContext";

const Page404 = React.lazy(() => import("./pages/Page404"));
const Login = React.lazy(() => import("./pages/Login"));
const Posts = React.lazy(() => import("./pages/Posts"));
const Post = React.lazy(() => import("./pages/Post"));
const Settings = React.lazy(() => import("./pages/Settings"));

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <React.Suspense fallback={<>Loading...</>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<LayoutWithHeader />}>
                <Route index element={<Posts />} />
                <Route path="posts/:slug" element={<Post />} />
                <Route path="*" element={<Page404 />} />
              </Route>

              <Route path="/user/*" element={<ProtectedRoute />}>
                <Route index element={<Settings />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<Page404 />} />
            </Routes>
          </React.Suspense>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
