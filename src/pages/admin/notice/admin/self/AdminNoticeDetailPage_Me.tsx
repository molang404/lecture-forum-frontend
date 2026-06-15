import { useEffect, useState } from "react";
import type { Notice } from "../../../../../types/notice.type.ts";
import { useNavigate, useParams } from "react-router";
import NoticeApi from "../../../../../api/user/noticeApi.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    LoadingText,
    PostContainer,
} from "../../../../../components/post/post.style.tsx";
import { useAuthStore } from "../../../../../stores/auth/authStore.ts";
import { Role } from "../../../../../types/user.type.ts";
import Button from "../../../../../components/common/button/Button.tsx";
import { AdminButtonGroup } from "../../../../../components/admin/admin.style.tsx";
import adminNoticeApi from "../../../../../api/admin/adminNoticeApi.ts";

function AdminNoticeDetailPage_Me() {
    const navigate = useNavigate();
    const [notice, setNotice] = useState<Notice | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams<{ id: string }>();
    const { user } = useAuthStore();

    useEffect(() => {const loadNotice = async () => {
            try {
                const data = await NoticeApi.getNoticeById(Number(id));
                setNotice(data);
            } catch (error) {
                console.log(error);
                alert("공지사항을 불러오는 중 오류가 발생했습니다.");
                navigate("-1");
            } finally {
                setIsLoading(false);
            }
        };

        loadNotice().then(() => {});
    }, [id, navigate]);

    if (isLoading) {
        return (
            <PostContainer>
                <LoadingText>공지사항 내용을 불러오는 중입니다...</LoadingText>
            </PostContainer>
        );
    }

    if (!notice) return;

    const handleDelete = async (id: number) => {
        if (!confirm("정말 공지사항을 삭제 하시겠습니까?")) {
            return;
        }

        try {
            await adminNoticeApi.deleteNotice(id);
            alert("공지사항이 성공적으로 삭제되었습니다.");
            navigate("/admin/notice");
        } catch (error) {
            console.log(error);
            alert("공지사항 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <PostContainer>
            <DetailWrapper>
                <DetailHeader>
                    <DetailTitle>{notice.title}</DetailTitle>
                    <DetailInfo>
                        <div className={"left-edit"}>
                            <span>
                                <p>토론대난투</p>
                            </span>
                            <span>
                                {new Date(notice.createdAt).toLocaleString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </DetailInfo>
                </DetailHeader>

                <DetailContent>{notice.content}</DetailContent>

                <AdminButtonGroup style={{ justifyContent: "space-between" }}>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로
                    </Button>

                    {user?.role === Role.ADMIN && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                color={"warning"}
                                variant={"contained"}
                                onClick={() => navigate(`/admin/notice/update/${id}`)}>
                                수정
                            </Button>
                            <Button
                                color={"error"}
                                variant={"contained"}
                                onClick={() => handleDelete(Number(id))}>
                                삭제
                            </Button>
                        </div>
                    )}
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default AdminNoticeDetailPage_Me;
