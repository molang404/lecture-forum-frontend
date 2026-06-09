import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NoticeInputType, noticeSchema } from "../../../../schemas/notice/noticeSchema.ts";
import adminNoticeApi from "../../../../api/admin/adminNoticeApi.ts";
import {
    AdminButtonGroup,
    AdminContainer,
    AdminForm,
    AdminPageHeader,
    AdminTitle,
} from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import TextareaGroup from "../../../../components/common/textarea/TextareaGroup.tsx";
import Button from "../../../../components/common/button/Button.tsx";

function AdminCreateNoticePage() {
    // 이것은 공지 사항 게시물을 등록하기 위해 필요한 화면
    // input으로 입력 받아야되는 내용은 title, content => req.body => noticeSchema를 만들었음
    // req.params 와 req.query는 존재 X

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(noticeSchema),
        mode: "onBlur",
    });

    const execSubmit = async (data: NoticeInputType) => {
        try {
            await adminNoticeApi.createNotice(data);
            navigate("/admin/notice");
        } catch (error) {
            console.log(error);
            alert("공지사항 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>새 공지사항 등록</AdminTitle>
            </AdminPageHeader>

            <Card>
                <AdminForm onSubmit={handleSubmit(execSubmit)}>
                    <InputGroup
                        id={"title"}
                        label={"제목"}
                        placeholder={"제목을 입력해주세요"}
                        errorMessage={errors.title?.message}
                        registerObj={register("title")}
                    />
                    <TextareaGroup
                        id={"content"}
                        label={"내용"}
                        placeholder={"내용을 입력해주세요"}
                        errorMessage={errors.content?.message}
                        registerObj={register("content")}
                    />
                    <AdminButtonGroup>
                        <Button color={"secondary"} variant={"text"} as={Link} to={"/admin/notice"}>
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
                </AdminForm>
            </Card>
        </AdminContainer>
    );
}

export default AdminCreateNoticePage;
