import { useEffect, useState } from "react";
import { Role, type User } from "../../../types/user.type.ts";
import adminUserApi from "../../../api/admin/user/adminUserApi.ts";
import {
    AdminButtonGroup,
    AdminContainer,
    AdminLoadingText,
    AdminPageHeader,
    AdminTable,
    AdminTableWrapper,
    AdminTd,
    AdminTh,
    AdminTitle,
} from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import { Link } from "react-router";
import Card from "../../../components/common/card/Card.tsx";
import Badge from "../../../components/common/badge/Badge.tsx";
import { FiEdit } from "react-icons/fi";

function AdminUserListPage() {
    const [list, setList] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await adminUserApi.fetchUserList();
                setList(data);
            } catch (error) {
                console.log(error);
                alert("사용자 목록을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        loadUser().then(() => {});
    }, []);
    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>사용자 관리</AdminTitle>
                <Button color={"primary"} variant={"contained"} as={Link} to={"/admin/user/create"}>
                    + 사용자 추가
                </Button>
            </AdminPageHeader>
            <Card>
                {loading ? (
                    <AdminLoadingText>불러오는 중...</AdminLoadingText>
                ) : (
                    <AdminTableWrapper>
                        <AdminTable>
                            <thead>
                                <AdminTh $width={"5%"}>ID</AdminTh>
                                <AdminTh $width={"15%"}>아이디</AdminTh>
                                <AdminTh $width={"15%"}>이름 (닉네임)</AdminTh>
                                <AdminTh $width={"20%"}>이메일</AdminTh>
                                <AdminTh $width={"10%"}>권한</AdminTh>
                                <AdminTh $width={"10%"}>상태</AdminTh>
                                <AdminTh $width={"15%"}>가입일</AdminTh>
                                <AdminTh $width={"10%"}>관리</AdminTh>
                            </thead>
                            <tbody>
                                {list.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={8}
                                            style={{ textAlign: "center", padding: "100px" }}>
                                            등록된 유저가 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {list.map(item => (
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
                                                    item.role === Role.ADMIN ? "error" : "primary"
                                                }>
                                                {item.role === "ADMIN" ? "관리자" : "일반"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>
                                            <Badge color={item.deletedAt ? "default" : "success"}>
                                                {item.deletedAt ? "탈퇴" : "정상"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>{new Date(item.createdAt).toLocaleString()}</AdminTd>
                                        <AdminTd>
                                            <AdminButtonGroup>
                                                <Button
                                                    variant={"icon"}
                                                    color={"primary"}
                                                    as={Link}
                                                    to={`/admin/user/${item.id}`}>
                                                    <FiEdit size={18} />
                                                </Button>
                                            </AdminButtonGroup>
                                        </AdminTd>
                                    </tr>
                                ))}
                            </tbody>
                        </AdminTable>
                    </AdminTableWrapper>
                )}
            </Card>
        </AdminContainer>
    );
}

export default AdminUserListPage;
