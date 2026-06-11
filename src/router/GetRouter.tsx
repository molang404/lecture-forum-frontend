import { createBrowserRouter, redirect } from "react-router";
import HomePage from "../pages/HomePage.tsx";
import AdminCategoryListPage from "../pages/admin/category/AdminCategoryListPage.tsx";
import { useAuthStore } from "../stores/auth/authStore.ts";
import { Role } from "../types/user.type.ts";
import AdminCategoryCreatePage from "../pages/admin/category/create/AdminCategoryCreatePage.tsx";
import MainLayout from "../layouts/MainLayout.tsx";
import SignInPage from "../pages/auth/signin/SignInPage.tsx";
import SignUpPage from "../pages/auth/signup/SignUpPage.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminCategoryEditPage from "../pages/admin/category/edit/AdminCategoryEditPage.tsx";
import AdminUserListPage from "../pages/admin/user/AdminUserListPage.tsx";
import AdminUserCreatePage from "../pages/admin/user/create/AdminUserCreatePage.tsx";
import AdminUserUpdatePage from "../pages/admin/user/update/AdminUserUpdatePage.tsx";
import PostListPage from "../pages/post/PostListPage.tsx";
import PostCreatePage from "../pages/post/create/PostCreatePage.tsx";
import PostDetailPage from "../pages/post/detail/PostDetailPage.tsx";
import AdminNoticeList from "../pages/admin/notice/admin/AdminNoticeList.tsx";
import AdminCreateNoticePage from "../pages/admin/notice/admin/create/AdminCreateNoticePage.tsx";
import AdminNoticeDetailPage from "../pages/admin/notice/admin/detail/AdminNoticeDetailPage.tsx";
import AdminNoticeUpdatePage from "../pages/admin/notice/admin/update/AdminNoticeUpdatePage.tsx";
import NoticeListPage from "../pages/admin/notice/NoticeListPage.tsx";
import NoticeDetailPage from "../pages/admin/notice/detail/NoticeDetailPage.tsx";
import AdminInquiryListPage from "../pages/admin/AdminInquiryListPage.tsx";

// 회원의 권한에 따라 접근할 수 있는 주소를 판별하기 위해서
// react-router 라이브러리에서는 "로더(loader)"라는 기능을 제공함

// 라우팅을 하기 전, 로더가 미들웨어로 동작하여 접근할 수 있는지 유무를 판별

const adminLoader = () => {
    // zustand가 저장하고 있는 회원 정보에 접근해서 가져와야 함
    // 컴포넌트 안에서는 const { user, isLoggedIn } = useAuthStore(); 불러오는게 가능함
    // 이 파일은 컴포넌트가 X. 화면에 그리기 전 단계의 처리 진행.
    // Next.js를 기준으로 설명하면, 지금 여기는 Client Side가 아님.

    const { user, isLoggedIn } = useAuthStore.getState();

    if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        // redirect() 는, 마찬가지로 컴포넌트가 아닌 곳에서 사용자를 이동시키는 메서드
        // 이전에 사용했던 navigate()는 컴포넌트에서 사용자를 이동 시키는 메서드
        return redirect("/auth/signin");
    }

    if (user?.role !== Role.ADMIN) {
        alert("관리자만 접근할 수 있는 페이지입니다.");
        return redirect("/");
    }

    return null;
};

const guestLoader = () => {
    const { isLoggedIn } = useAuthStore.getState();

    if (isLoggedIn) {
        return redirect("/");
    }

    return null;
};

const userLoader = () => {
    const { isLoggedIn } = useAuthStore.getState();

    if (!isLoggedIn) {
        return redirect("/");
    }

    return null;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "category", children: [{ path: ":categoryId", element: <PostListPage /> }] },
            {
                path: "post",
                children: [
                    { path: ":id", element: <PostDetailPage /> },
                    { path: "create/:categoryId", loader: userLoader, element: <PostCreatePage /> },
                ],
            },
            {
                path: "auth",
                loader: guestLoader,
                children: [
                    { path: "signin", element: <SignInPage /> },
                    { path: "signup", element: <SignUpPage /> },
                ],
            },
            {
                path: "notice",
                children: [
                    { index: true, element: <NoticeListPage /> },
                    { path: ":id", element: <NoticeDetailPage /> },
                ],
            },
        ],
    },
    {
        path: "/admin",
        loader: adminLoader,
        element: <AdminLayout />,
        children: [
            {
                path: "category",
                children: [
                    { index: true, element: <AdminCategoryListPage /> },
                    { path: "create", element: <AdminCategoryCreatePage /> },
                    { path: "edit/:id", element: <AdminCategoryEditPage /> },
                ],
            },
            {
                path: "user",
                children: [
                    { index: true, element: <AdminUserListPage /> },
                    { path: "create", element: <AdminUserCreatePage /> },
                    { path: ":id", element: <AdminUserUpdatePage /> },
                ],
            },
            {
                path: "notice",
                children: [
                    { index: true, element: <AdminNoticeList /> },
                    // { path: "create", element: <AdminCreateNoticePage_Adm /> },
                    { path: "create", element: <AdminCreateNoticePage /> },
                    // { path: ":id", element: <AdminNoticeDetailPage_Me /> },
                    { path: ":id", element: <AdminNoticeDetailPage /> },
                    // { path: "update/:id", element: <AdminUpdateNoticePage_Me /> },
                    { path: "update/:id", element: <AdminNoticeUpdatePage /> },
                ],
            },
            {
                path: "inquiry",
                children: [{ index: true, element: <AdminInquiryListPage /> }],
            },
        ],
    },
]);

export default router;
