import type { Inquiry } from "../../types/inquiry.type.ts";
import {
    AdminButtonGroup,
    AnswerContent,
    AnswerDisplay,
    AnswerHeader,
} from "../admin/admin.style.tsx";
import Button from "../common/button/Button.tsx";
import adminInquiryApi from "../../api/admin/adminInquiryApi.ts";

interface Props {
    inquiry: Inquiry;
    reload: () => Promise<void>;
}

function AdminInquiryAnswerBox({ inquiry, reload }: Props) {
    const handleDeleteAnswer = async () => {
        try {
            await adminInquiryApi.deleteInquiryAnswer(inquiry.id);
            // 글 상세 내용을 다시 받아와야 함
            await reload();
            alert("관리자 답변 삭제가 완료 되었습니다.");
        } catch (error) {
            console.log(error);
            alert("관리자 답변 삭제 중 오류가 발생했습니다.");
        }
    };

    // 답변 내용이 출렫되는 컴포넌트
    return (
        <AnswerDisplay>
            <AnswerHeader>
                <h4>관리자 답변</h4>
                <small>
                    답변일시 : {inquiry.answeredAt && new Date(inquiry.answeredAt).toLocaleString()}
                </small>
            </AnswerHeader>
            <AnswerContent className={"answer-content"}>{inquiry.answer}</AnswerContent>

            <AdminButtonGroup $align={"right"} style={{ marginTop: "24px" }}>
                <Button color={"warning"} variant={"contained"}>
                    답변 수정
                </Button>
                <Button color={"error"} variant={"contained"} onClick={handleDeleteAnswer}>
                    답변 삭제
                </Button>
            </AdminButtonGroup>
        </AnswerDisplay>
    );
}

export default AdminInquiryAnswerBox;
