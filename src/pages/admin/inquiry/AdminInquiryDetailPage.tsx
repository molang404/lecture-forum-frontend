import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";
import type { Inquiry } from "../../../types/inquiry.type.ts";
import inquiryApi from "../../../api/user/inquiryApi.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    FormDivider,
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

    // useCallback() : React에서 제공하는 기능
    // loadInquiry는 useEffect 안에 있을 때는 계속 새로운 애가 생성되는 건데
    // 밖으로 뺐기 때문에 loadInquiry 는 유일한 애가 되었음
    // useCallback은 불러낼 때 이 함수가 재생성 되는 걸 결정하는 의존성 배열

    // useEffect : 초기 렌더링이 끝난 이루에 1회 무조건 실행
    //             의존성 배열에 존재하는 값이 변경이 될 경우, 재실행
    // useCallback : 최초에 하무가 생성되어 메모리에 저장
    //               의존성 배열에 존재하는 값이 변경 될 경우, 함수를 재생성

    // loadInquiry라고 작성한 함수는, AdminInquiryDetailPage(부모 컴포넌트)가
    // 화면에 출력이 될 때 완성 상태로 메모리에 적재되고
    // 그걸 계속 useEffect가 불러와서 쓰게 됨 -> 뭔가 상황이 바뀌었다는 걸 의미
    // useCallback으로, 상화잉 바뀐 걸 반영해서 함수를 재성성해달라고 씀

    const loadInquiry = useCallback(async () => {
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
    }, [inquiryId, navigate]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadInquiry().then(() => {});
    }, [inquiryId, loadInquiry, navigate]);

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
                            <span>{inquiry.user.nickname}</span>
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
                        <AdminInquiryAnswerBox inquiry={inquiry} reload={loadInquiry} />
                    ) : (
                        <AdminInquiryAnswerForm inquiryId={inquiryId} reload={loadInquiry} />
                    )}
                </AnswerSection>

                <AdminButtonGroup
                    style={{ marginTop: "40px" }}
                    $align={inquiry.answer ? "space-between" : "right"}>
                    <Button
                        color={"secondary"}
                        variant={"contained"}
                        onClick={() => navigate("/admin/inquiry")}>
                        목록으로
                    </Button>

                    {inquiry.answer && (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                color={"warning"}
                                variant={"contained"}
                                onClick={() => navigate(`/admin/inquiry/edit/${inquiryId}`)}>
                                수정
                            </Button>
                            <Button color={"error"} variant={"contained"}>
                                삭제
                            </Button>
                        </div>
                    )}
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default AdminInquiryDetailPage;
