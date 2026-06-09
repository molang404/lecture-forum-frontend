import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Notice } from "../../../../../types/notice.type.ts";
import noticeApi from "../../../../../api/user/noticeApi.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    LoadingText,
    PostContainer,
} from "../../../../../components/post/post.style.tsx";
import { AdminButtonGroup } from "../../../../../components/admin/admin.style.tsx";
import Button from "../../../../../components/common/button/Button.tsx";
import adminNoticeApi from "../../../../../api/admin/adminNoticeApi.ts";

function AdminNoticeDetailPage() {
    const navigate = useNavigate();
    const [notice, setNotice] = useState<Notice | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        // useEffect 안에서 실행할 기능은 useEffect 안에서 선언해주는 게 기본
        const loadNotice = async () => {
            try {
                const data = await noticeApi.getNoticeById(Number(id));
                setNotice(data);
            } catch (error) {
                console.log(error);
                alert("공지사항을 불러오는 중 오류가 발생했습니다");
                navigate(-1);
            } finally {
                setIsLoading(false);
            }
        };

        loadNotice().then(() => {});
    }, [id, navigate]);

    const handleDeleteNotice = async () => {
        if (!window.confirm("정말 이 공지사항을 삭제하시겠습니까?")) {
            return;
        }

        try {
            await adminNoticeApi.deleteNotice(Number(id));
            navigate("/admin/notice");
        } catch (error) {
            console.log(error);
            alert("공지사항 삭제 중 오류가 발생했습니다");
        }
    };

    if (isLoading) {
        return (
            <PostContainer>
                <LoadingText>공지사항 내용을 불러오는 중입니다...</LoadingText>
            </PostContainer>
        );
    }

    // notice가 Notice | null 이 허용되어 있는 state이기 때문
    if (!notice) return;

    return (
        <PostContainer>
            <DetailWrapper>
                <DetailHeader>
                    <DetailTitle>{notice.title}</DetailTitle>
                    <DetailInfo>
                        <div className={"left-Info"}>
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

                <AdminButtonGroup style={{ marginTop: "40px" }}>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로
                    </Button>
                    <Button
                        color={"warning"}
                        variant={"contained"}
                        onClick={() => navigate(`/admin/notice/update/${id}`)}>
                        수정
                    </Button>
                    <Button
                        color={"error"}
                        variant={"contained"}
                        onClick={() => handleDeleteNotice()}>
                        삭제
                    </Button>
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default AdminNoticeDetailPage;
