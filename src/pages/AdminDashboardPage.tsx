import { useCallback, useEffect, useState } from "react";
import adminDashBoardApi from "../api/admin/adminDashBoardApi.ts";
import { AdminButtonGroup, AdminContainer,
    AdminLoadingText, AdminPageHeader, AdminTable, AdminTableWrapper, AdminTd, AdminTh, AdminTitle } from "../components/admin/admin.style.tsx";
import Button from "../components/common/button/Button.tsx";
import { Link } from "react-router";
import { FiEdit, FiHome, FiTrash, FiUser } from "react-icons/fi";
import Card from "../components/common/card/Card.tsx";
import { LoadingText } from "../components/post/post.style.tsx";
import Badge from "../components/common/badge/Badge.tsx";
import { Role, type User } from "../types/user.type.ts";
import type { Post } from "../types/post.type.ts";
import type { Inquiry } from "../types/inquiry.type.ts";
import adminUserApi from "../api/admin/user/adminUserApi.ts";
import { DashboardTitle, DashboardWrapper } from "../components/common/dashboard/Dashboard.tsx";

function AdminDashboardPage() {
    // 백엔드에게 요청해서 데이터를 받아올 것이니
    // state 선언
    type DashboardSummary = {
        users: User[];
        posts: Post[];
        inquiries: Inquiry[];
    };

    const [userList, setUserList] = useState<User[]>([]);
    const [postList, setPostList] = useState<Post[]>([]);
    const [inquiryList, setInquiryList] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect + axios API 를 통해 데이터를 받아오고
    const loadRecent = useCallback(async () => {
        try {
            const result: DashboardSummary = await adminDashBoardApi.adminDashBoardList();
            setUserList(result.users);
            setPostList(result.posts);
            setInquiryList(result.inquiries);
        } catch (error) {
            console.log(error);
            alert("관리자 대시보드 데이터를 가져오는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadRecent().then(() => {});
    }, [loadRecent]);

    const handleDeleteUser = async (id: number) => {
        if (!confirm("정말 이 유저를 삭제(탈퇴) 처리 하시겠습니까?")) {
            return;
        }

        try {
            await adminUserApi.deleteUser(id);
            alert("사용자 정보가 성공적으로 삭제되었습니다.");
            loadRecent().then(() => {});
        } catch (error) {
            console.log(error);
            alert("사용자 삭제 중 오류가 발생했습니다.");
        }
    };

    // 그에 대한 화면 출력
    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>대시보드</AdminTitle>
                <Button color={"primary"} variant={"contained"} as={Link} to={"/"}>
                    <FiHome size={20} />
                </Button>
            </AdminPageHeader>

            <DashboardWrapper>
                <DashboardTitle>
                    <FiUser size={18} />
                    최근 사용자 목록
                </DashboardTitle>
                <Card>
                    {isLoading ? (
                        <LoadingText>불러오는 중...</LoadingText>
                    ) : (
                        <AdminTableWrapper>
                            <AdminTable>
                                <thead>
                                    <tr>
                                        <AdminTh $width={"5%"}>ID</AdminTh>
                                        <AdminTh $width={"15%"}>아이디</AdminTh>
                                        <AdminTh $width={"15%"}>이름 (닉네임)</AdminTh>
                                        <AdminTh $width={"20%"}>이메일</AdminTh>
                                        <AdminTh $width={"10%"}>권한</AdminTh>
                                        <AdminTh $width={"10%"}>상태</AdminTh>
                                        <AdminTh $width={"15%"}>가입일</AdminTh>
                                        <AdminTh $width={"10%"}>관리</AdminTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList.length === 0 && (
                                        <tr>
                                            <AdminTd
                                                colSpan={8}
                                                style={{ textAlign: "center", padding: "100px" }}>
                                                등록된 유저가 없습니다.
                                            </AdminTd>
                                        </tr>
                                    )}
                                    {userList.map(item => (
                                        <tr key={item.id}>
                                            <AdminTd>{item.id}</AdminTd>
                                            <AdminTd>{item.username}</AdminTd>
                                            <AdminTd>
                                                {item.name} <br />
                                                <small>{item.nickname}</small>
                                            </AdminTd>
                                            <AdminTd>{item.email}</AdminTd>
                                            <AdminTd>
                                                <Badge
                                                    color={
                                                        item.role === Role.ADMIN
                                                            ? "error"
                                                            : "primary"
                                                    }>
                                                    {item.role === "ADMIN" ? "관리자" : "일반"}
                                                </Badge>
                                            </AdminTd>
                                            <AdminTd>
                                                <Badge
                                                    color={item.deletedAt ? "default" : "success"}>
                                                    {item.deletedAt ? "탈퇴" : "정상"}
                                                </Badge>
                                            </AdminTd>
                                            <AdminTd>
                                                {new Date(item.createdAt).toLocaleString()}
                                            </AdminTd>
                                            <AdminTd>
                                                <AdminButtonGroup>
                                                    <Button
                                                        variant={"icon"}
                                                        color={"primary"}
                                                        as={Link}
                                                        to={`/admin/user/${item.id}`}>
                                                        <FiEdit size={18} />
                                                    </Button>
                                                    {!item.deletedAt && (
                                                        <Button
                                                            color={"error"}
                                                            variant={"icon"}
                                                            onClick={() =>
                                                                handleDeleteUser(item.id)
                                                            }>
                                                            <FiTrash size={18} />
                                                        </Button>
                                                    )}
                                                </AdminButtonGroup>
                                            </AdminTd>
                                        </tr>
                                    ))}
                                </tbody>
                            </AdminTable>
                        </AdminTableWrapper>
                    )}
                </Card>
            </DashboardWrapper>

            <DashboardWrapper>
                <DashboardTitle>최근 게시물 목록</DashboardTitle>
                <Card>
                    {isLoading ? (
                        <LoadingText>불러오는 중...</LoadingText>
                    ) : (
                        <AdminTableWrapper>
                            <AdminTable>
                                <thead>
                                    <tr>
                                        <AdminTh $width={"10%"}>번호</AdminTh>
                                        <AdminTh>제목</AdminTh>
                                        <AdminTh $width={"15%"}>작성자</AdminTh>
                                        <AdminTh $width={"15%"}>작성일</AdminTh>
                                        <AdminTh $width={"10%"}>조회수</AdminTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {postList.length === 0 && (
                                        <tr>
                                            <AdminTd colSpan={5} style={{ padding: "100px 0" }}>
                                                아직 작성된 게시글이 없습니다. 첫 글을 남겨주세요!
                                            </AdminTd>
                                        </tr>
                                    )}
                                    {postList.map(item => (
                                        <tr key={item.id}>
                                            <AdminTd>{item.id}</AdminTd>
                                            <AdminTd className={"title-cell"}>
                                                <Link to={`/post/${item.id}`}>{item.title}</Link>
                                            </AdminTd>
                                            <AdminTd>{item.user.nickname}</AdminTd>
                                            <AdminTd>
                                                {new Date(item.createdAt).toLocaleString("ko-KR", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                })}
                                            </AdminTd>
                                            <AdminTd>{item.views}</AdminTd>
                                        </tr>
                                    ))}
                                </tbody>
                            </AdminTable>
                        </AdminTableWrapper>
                    )}
                </Card>
            </DashboardWrapper>

            <DashboardWrapper>
                <DashboardTitle>최근 문의사항 목록</DashboardTitle>
                <Card>
                    {isLoading ? (
                        <AdminLoadingText>불러오는 중...</AdminLoadingText>
                    ) : (
                        <AdminTableWrapper>
                            <AdminTable>
                                <thead>
                                    <tr>
                                        <AdminTh $width={"10%"}>ID</AdminTh>
                                        <AdminTh $width={"60%"}>제목</AdminTh>
                                        <AdminTh $width={"20%"}>작성일</AdminTh>
                                        <AdminTh $width={"10%"}>작성자</AdminTh>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inquiryList.length === 0 && (
                                        <tr>
                                            <AdminTd
                                                colSpan={4}
                                                style={{ textAlign: "center", padding: "100px 0" }}>
                                                등록된 문의 사항이 없습니다.
                                            </AdminTd>
                                        </tr>
                                    )}
                                    {inquiryList.map(item => (
                                        <tr key={item.id}>
                                            <AdminTd>{item.id}</AdminTd>
                                            <AdminTd>
                                                <Link to={`/admin/inquiry/${item.id}`}>
                                                    {item.title}
                                                </Link>
                                            </AdminTd>
                                            <AdminTd>
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </AdminTd>
                                            <AdminTd>{item.user.nickname}</AdminTd>
                                        </tr>
                                    ))}
                                </tbody>
                            </AdminTable>
                        </AdminTableWrapper>
                    )}
                </Card>
            </DashboardWrapper>
        </AdminContainer>
    );
}

export default AdminDashboardPage;
