import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NoticeInputType, noticeSchema } from "../../../../../schemas/notice/noticeSchema.ts";
import { useEffect, useState } from "react";
import noticeApi from "../../../../../api/user/noticeApi.ts";
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
import adminNoticeApi from "../../../../../api/admin/adminNoticeApi.ts";

function AdminNoticeUpdatePage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset, // react-hook-form이 관리하고 있는 state 값을 리셋하겠다
        // setValue,      // react-hook-form이 관리하고 있는 state 값을 정하겠다
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(noticeSchema),
        mode: "onBlur",
    });

    // 원래 있던 글의 내용을 불러와서
    // 그걸 input과 textarea에 넣어줘야 함

    useEffect(() => {
        const loadNotice = async () => {
            try {
                const data = await noticeApi.getNoticeById(Number(id));
                reset({
                    title: data.title,
                    content: data.content,
                });
            } catch (error) {
                console.log(error);
                alert("존재하지 않거나 삭제된 공지사항입니다.");
                navigate("/admin/notice");
            } finally {
                setIsLoading(false);
            }
        };

        loadNotice().then(() => {});
    }, [id, navigate, reset]);

    const execUpdate = async (data: NoticeInputType) => {
        try {
            await adminNoticeApi.updateNotice(Number(id), data);
            // navigate(-1); -> 뒤로가기를 해도 글 상세
            navigate(`/admin/notice/${id}`); // 글 상세
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
                    <AdminForm onSubmit={handleSubmit(execUpdate)}>
                        <InputGroup
                            id={"title"}
                            label={"제목"}
                            placeholder={"제목을 입력하세요"}
                            errorMessage={errors.title?.message}
                            registerObj={register("title")}
                        />
                        <TextareaGroup
                            id={"content"}
                            label={"내용"}
                            placeholder={"내용을 입력하세요"}
                            errorMessage={errors.content?.message}
                            registerObj={register("content")}
                        />

                        <AdminButtonGroup $align={"right"} style={{ marginTop: "16px" }}>
                            <Button
                                color={"secondary"}
                                variant={"text"}
                                onClick={() => navigate(-1)}>
                                취소
                            </Button>
                            <Button
                                color={"primary"}
                                variant={"contained"}
                                type={"submit"}
                                disabled={isSubmitting}>
                                {isSubmitting ? "저장 중" : "수정"}
                            </Button>
                        </AdminButtonGroup>
                    </AdminForm>
                )}
            </Card>
        </AdminContainer>
    );
}

export default AdminNoticeUpdatePage;
