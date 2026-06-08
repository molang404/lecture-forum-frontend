import { AdminButtonGroup, AdminContainer, AdminForm, AdminPageHeader, AdminTitle } from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import TextareaGroup from "../../../../components/common/textarea/TextareaGroup.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NoticeInputType, noticeSchema } from "../../../../schemas/notice/noticeSchema.ts";

function AdminUpdateNoticePage() {


    const {
        register,
        // handleSubmit,
        // setValue,
        formState: { errors, isSubmitting },
    } = useForm<NoticeInputType>({
        resolver: zodResolver(noticeSchema),
        mode: "onBlur"
    });

    // const onSubmit = async (data: NoticeInputType) => {
    //
    // };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>공지사항 수정</AdminTitle>
            </AdminPageHeader>

            <Card>
                <AdminForm>
                    <InputGroup
                        id={"title"}
                        label={"공지사항 제목"}
                        placeholder={"수정할 공지사항 제목을 입력하세요."}
                        errorMessage={errors.title?.message}
                        registerObj={register("title")}
                    />
                    <TextareaGroup
                        label={"공지 발제 (본문)"}
                        id={"content"}
                        placeholder={"수정할 공지사항 내용을 작성해주세요."}
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

export default AdminUpdateNoticePage;