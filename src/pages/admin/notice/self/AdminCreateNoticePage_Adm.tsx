import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NoticeInputType, noticeSchema } from "../../../../schemas/notice/noticeSchema.ts";
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
import { Link, useNavigate } from "react-router";
import adminNoticeApi from "../../../../api/admin/adminNoticeApi.ts";

function AdminCreateNoticePage_Adm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(noticeSchema),
        mode: "onBlur",
    });

    const onSubmit = async (input: NoticeInputType) => {
        try {
            await adminNoticeApi.createNotice(input);
            alert("공지사항이 성공적으로 등록 되었습니다.");
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
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup
                        id={"title"}
                        label={"공지사항 제목"}
                        placeholder={"등록할 공지사항 제목을 입력하세요."}
                        errorMessage={errors.title?.message}
                        registerObj={register("title")}
                    />
                    <TextareaGroup
                        label={"공지 발제 (본문)"}
                        id={"content"}
                        placeholder={"사용자들에게 알릴 공지사항을 작성해주세요."}
                        errorMessage={errors.content?.message}
                        registerObj={register("content")}
                    />
                    <AdminButtonGroup>
                        <Button
                            color={"secondary"}
                            variant={"contained"}
                            as={Link}
                            to={"/admin/notice"}>
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
                </AdminForm>
            </Card>
        </AdminContainer>
    );
}

export default AdminCreateNoticePage_Adm;
