import { useNavigate, useParams } from "react-router";
import type { Notice } from "../../../../types/notice.type.ts";
import { useEffect, useState } from "react";
import NoticeApi from "../../../../api/user/noticeApi.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    LoadingText,
    PostContainer,
} from "../../../../components/post/post.style.tsx";
import { AdminButtonGroup } from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";

function NoticeDetailPage() {
    const navigate = useNavigate();
    const [notice, setNotice] = useState<Notice | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const loadNotice = async () => {
            try {
                const data = await NoticeApi.getNoticeById(Number(id));
                setNotice(data);
            } catch (error) {
                console.log(error);
                alert("공지사항을 불러오는 중 오류가 발생했습니다.");
                navigate(-1);
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

    return (
        <PostContainer>
            <DetailWrapper>
                <DetailHeader>
                    <DetailTitle>{notice.title}</DetailTitle>
                    <DetailInfo>
                        <div className={"left-info"}>
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

                <AdminButtonGroup style={{ marginTop: "40px" }}>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로
                    </Button>
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default NoticeDetailPage;
