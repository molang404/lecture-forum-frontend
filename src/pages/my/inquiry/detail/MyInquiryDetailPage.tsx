import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Inquiry } from "../../../../types/inquiry.type.ts";
import inquiryApi from "../../../../api/user/inquiryApi.ts";
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

function MyInquiryDetailPage() {
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState<Inquiry | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { inquiryId } = useParams<{ inquiryId: string }>();

    useEffect(() => {
        const loadInquiry = async () => {
            try {
                const data = await inquiryApi.getMyInquiryById(Number(inquiryId));
                setInquiry(data);
            } catch (error) {
                console.log(error);
                alert("문의글을 불러오는 중 오류가 발생했습니다.");
                navigate("/my/inquiry");
            } finally {
                setIsLoading(false);
            }
        };

        loadInquiry().then(() => {});
    }, [inquiryId, navigate]);

    const handleDelete = async () => {
        // 백엔드에 삭제 요청하는 함수
        try {
            await inquiryApi.deleteMyInquiry(Number(inquiryId));
            alert("문의글 삭제가 완료 되었습니다.");
            navigate("/my/inquiry");
        } catch (error) {
            console.log(error);
            alert("문의 글 삭제 중 오류가 발생했습니다.");
        }
    };

    if (isLoading) {
        return (
            <PostContainer>
                <LoadingText>글 내용을 불러오는 중입니다...</LoadingText>
            </PostContainer>
        );
    }

    if (!inquiry) return;

    return (
        <PostContainer>
            <DetailWrapper>
                <DetailHeader>
                    <DetailTitle>{inquiry.title}</DetailTitle>
                    <DetailInfo>
                        <div className={"left-info"}>
                            <span>
                                {new Date(inquiry.createdAt).toLocaleString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        <div className={"right-info"}></div>
                    </DetailInfo>
                </DetailHeader>

                <DetailContent>{inquiry.content}</DetailContent>

                <AdminButtonGroup $align={!inquiry.answer ? "space-between" : "right"}>
                    <Button
                        color={"secondary"}
                        variant={"contained"}
                        onClick={() => navigate("/my/inquiry")}>
                        목록으로
                    </Button>

                    {!inquiry.answer && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                color={"warning"}
                                variant={"contained"}
                                onClick={() => navigate(`/my/inquiry/edit/${inquiryId}`)}>
                                수정
                            </Button>
                            <Button color={"error"} variant={"contained"} onClick={handleDelete}>
                                삭제
                            </Button>
                        </div>
                    )}
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default MyInquiryDetailPage;
