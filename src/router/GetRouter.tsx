import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage.tsx";
import SignInPage from "../pages/auth/signin/SignInPage.tsx";
import SignUpPage from "../pages/auth/signup/SignUpPage.tsx";
import MainLayout from "../;ayouts/MainLayout.tsx";
import AdminLayout from "../;ayouts/AdminLayout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "auth",
                children: [
                    { path: "signin", element: <SignInPage /> },
                    { path: "signup", element: <SignUpPage /> },
                ]
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
    }
]);

export default router;
