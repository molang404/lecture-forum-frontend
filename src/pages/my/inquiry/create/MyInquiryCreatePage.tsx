import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type InquiryInputType, inquirySchema } from "../../../../schemas/inquiry/inquirySchema.ts";
import inquiryApi from "../../../../api/user/inquiryApi.ts";
import {
    FormDivider,
    FormWrapper,
    PostContainer,
    PostPageHeader,
    PostTitle,
} from "../../../../components/post/post.style.tsx";
import { FiMessageSquare } from "react-icons/fi";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import TextareaGroup from "../../../../components/common/textarea/TextareaGroup.tsx";
import { AdminButtonGroup } from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";

function MyInquiryCreatePage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(inquirySchema),
        mode: "onBlur",
    });

    const onSubmit = async (input: InquiryInputType) => {
        try {
            const result = await inquiryApi.createMyInquiry(input);
            navigate(`/my/inquiry/${result.id}`);
        } catch (error) {
            console.log(error);
            alert("문의글 등록에 실패했습니다.");
        }
    };

    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>
                    <FiMessageSquare size={26} style={{ color: "#FBBF24" }} />
                    1:1 문의 등록 <small>개선 사항이나 질문을 적어주세요</small>
                </PostTitle>
            </PostPageHeader>

            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <InputGroup
                    label={"문의 제목"}
                    id={"title"}
                    placeholder={"문의 사항의제목을 입력해주세요."}
                    errorMessage={errors.title?.message}
                    registerObj={register("title")}
                />
                <TextareaGroup
                    label={"문의 내용"}
                    id={"content"}
                    placeholder={"문의 내용에 대해 자세히 입력해주세요."}
                    errorMessage={errors.content?.message}
                    registerObj={register("content")}
                />

                <FormDivider />

                <AdminButtonGroup>
                    <Button color={"primary"} variant={"text"} onClick={() => navigate(-1)}>
                        취소
                    </Button>
                    <Button
                        type={"submit"}
                        color={"primary"}
                        variant={"contained"}
                        disabled={isSubmitting}>
                        등록
                    </Button>
                </AdminButtonGroup>
            </FormWrapper>
        </PostContainer>
    );
}

export default MyInquiryCreatePage;
