import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Inquiry } from "../../../types/inquiry.type.ts";
import inquiryApi from "../../../api/user/inquiryApi.ts";
import adminInquiryApi from "../../../api/admin/adminInquiryApi.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper, FormDivider,
    LoadingText,
    PostContainer,
} from "../../../components/post/post.style.tsx";
import { AdminButtonGroup, AnswerSection } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import AdminInquiryAnswerBox from "../../../components/inquiry/AdminInquiryAnswerBox.tsx";
import AdminInquiryAnswerForm from "../../../components/inquiry/AdminInquiryAnswerForm.tsx";

function AdminInquiryDetailPage() {
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState<Inquiry | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams<{ id: string }>();
    const inquiryId = Number(id);

    useEffect(() => {
        const loadInquiry = async () => {
            try {
                const data = await inquiryApi.getMyInquiryById(inquiryId);
                setInquiry(data);
            } catch (error) {
                console.log(error);
                alert("문의글을 불러오는 중 오류가 발생했습니다.");
                navigate("/admin/inquiry");
            } finally {
                setIsLoading(false);
            }
        };

        loadInquiry().then(() => {});
    }, [inquiryId, navigate]);

    const handleDelete = async () => {
        try {
            await adminInquiryApi.deleteInquiryAnswer(inquiryId);
            alert("문의글 삭제가 완료 되었습니다.");
            navigate("/admin/inquiry");
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
                            <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                        </div>
                    </DetailInfo>
                </DetailHeader>

                <DetailContent>{inquiry.content}</DetailContent>

                <FormDivider />

                {/*
                     만약에, 답변이 아직 달리지 않았다면 Textarea를 띄워서 답변을 달 수 있도록 할 것이고
                            답변이 이미 달렸다면 답변 내용이 출력될 수 있도록 함
                */}
                <AnswerSection>
                    {inquiry.answer ? (
                        <AdminInquiryAnswerBox />
                    ) : (
                        <AdminInquiryAnswerForm inquiryId={inquiryId} />
                    )}
                </AnswerSection>

                <AdminButtonGroup style={{ marginTop: "40px" }} $align={"space-between"}>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로
                    </Button>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <Button
                            color={"warning"}
                            variant={"contained"}
                            onClick={() => navigate(`/admin/inquiry/update/${inquiry.id}`)}>
                            수정
                        </Button>
                        <Button color={"error"} variant={"contained"} onClick={handleDelete}>
                            삭제
                        </Button>
                    </div>
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default AdminInquiryDetailPage;
