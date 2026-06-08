import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NoticeInputType, noticeSchema } from "../../../../schemas/notice/noticeSchema.ts";
import adminNoticeApi from "../../../../api/admin/adminNoticeApi.ts";
import { Link, useNavigate } from "react-router";
import {
    FormWrapper,
    PostContainer,
    PostPageHeader,
    PostTitle,
} from "../../../../components/post/post.style.tsx";
import { FiBell } from "react-icons/fi";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import TextareaGroup from "../../../../components/common/textarea/TextareaGroup.tsx";
import { AdminButtonGroup } from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";

function AdminNoticeCreate_Pst() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(noticeSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: NoticeInputType) => {
        try {
            await adminNoticeApi.createNotice(data);
            alert("공지사항이 등록되었습니다.");
            navigate("admin/notice");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>
                    <FiBell size={26} style={{ color: "#FBBF24" }} />
                    공지사항 등록 <small>새로운 소식 알리기</small>
                </PostTitle>
            </PostPageHeader>

            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <InputGroup
                    label={"토론 제목"}
                    id={"title"}
                    placeholder={"공지 내용에 맞는 제목을 작성해주세요."}
                    errorMessage={errors.title?.message}
                    registerObj={register("title")}
                />
                <TextareaGroup
                    label={"주제 발제 (본문)"}
                    id={"content"}
                    placeholder={"공지 내용을 정확하고 상세하게 전달하세요!"}
                    errorMessage={errors.content?.message}
                    registerObj={register("content")}
                />
            </FormWrapper>
            <AdminButtonGroup style={{ marginTop: "20px" }}>
                <Button color={"secondary"} variant={"contained"} as={Link} to={"/admin/notice"}>
                    취소
                </Button>
                <Button
                    color={"primary"}
                    variant={"contained"}
                    type={"submit"}
                    disabled={isSubmitting}>
                    등록
                </Button>
            </AdminButtonGroup>
        </PostContainer>
    );
}

export default AdminNoticeCreate_Pst;
