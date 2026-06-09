import {
    AdminButtonGroup,
    AdminContainer,
    AdminForm,
    AdminLoadingText,
    AdminPageHeader,
    AdminTitle,
} from "../../../../../components/admin/admin.style.tsx";
import Card from "../../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../../components/common/input/InputGroup.tsx";
import TextareaGroup from "../../../../../components/common/textarea/TextareaGroup.tsx";
import Button from "../../../../../components/common/button/Button.tsx";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NoticeInputType, noticeSchema } from "../../../../../schemas/notice/noticeSchema.ts";
import { useEffect, useState } from "react";
import adminNoticeApi from "../../../../../api/admin/adminNoticeApi.ts";
import noticeApi from "../../../../../api/user/noticeApi.ts";

function AdminUpdateNoticePage_Me() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<NoticeInputType>({
        resolver: zodResolver(noticeSchema),
        mode: "onBlur",
    });

    useEffect(() => {
        const loadInitialData = async () => {
            if (!id) return;
            try {
                const result = await noticeApi.getNoticeById(Number(id));
                reset({
                    title: result.title,
                    content: result.content,
                });
            } catch (error) {
                console.log(error);
                alert("존재하지 않거나 삭제된 공지사항입니다.");
                navigate("/admin/notice");
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData().then(() => {});
    }, [id, navigate, reset]);

    const onSubmit = async (data: NoticeInputType) => {
        try {
            await adminNoticeApi.updateNotice(Number(id), data);
            alert("공지사항이 성공적으로 수정되었습니다.");
            navigate("/admin/notice");
        } catch (error) {
            console.log(error);
            alert("공지사항 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>공지사항 수정</AdminTitle>
            </AdminPageHeader>

            <Card>
                {isLoading ? (
                    <AdminLoadingText>데이터를 불러오는 중...</AdminLoadingText>
                ) : (
                    <AdminForm onSubmit={handleSubmit(onSubmit)}>
                        <InputGroup
                            id={"title"}
                            label={"공지사항 제목"}
                            placeholder={"수정할 공지사항 제목을 입력하세요."}
                            errorMessage={errors.title?.message}
                            registerObj={register("title")}
                        />
                        <TextareaGroup
                            label={"내용 발제 (본문)"}
                            id={"content"}
                            placeholder={"수정할 공지사항 내용을 작성해주세요."}
                            errorMessage={errors.content?.message}
                            registerObj={register("content")}
                        />
                        <AdminButtonGroup>
                            <Button
                                color={"secondary"}
                                variant={"text"}
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
                )}
            </Card>
        </AdminContainer>
    );
}

export default AdminUpdateNoticePage_Me;
