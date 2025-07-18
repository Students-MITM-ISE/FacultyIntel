import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home/Home";
import Faculty from "./pages/Faculty/Faculty";
import HoD from "./pages/HoD/HoD";
import Admin from "./pages/Admin/Admin";
import AppLayout from "./ui/AppLayout";
import Login from "./ui/Login";
import Signup from "./ui/Signup";
import PageNotFound from "./ui/PageNotFound";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    // staleTime: 60 * 1000, //! minute
    staleTime: 0, //Always re-fetch
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<Home />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="hod" element={<HoD />} />
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000, //3 seconds
          },
          error: {
            duration: 5000, //5 seconds
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
