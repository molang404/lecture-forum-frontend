import TextareaGroup from "../../common/textarea/TextareaGroup.tsx";
import { StyledReplyForm } from "../reply.style.tsx";
import Button from "../../common/button/Button.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type CreateReplyInputType,
    createReplySchema,
} from "../../../schemas/reply/createReplySchema.ts";
import replyApi from "../../../api/user/replyApi.ts";
import { useEffect } from "react";

interface Props {
    postId: number;
    loadReplies: (page: number) => Promise<void>;
    isLoggedIn: boolean;
}

function ReplyForm({ postId, loadReplies, isLoggedIn }: Props) {
    // 코드를 옮겨 놓고 보니
    // postId 필요하고, isLoggedIN 필요하고, loadReplies 함수 필요

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createReplySchema),
        mode: "onBlur",
    });

    useEffect(() => {
        reset({
            postId,
        });
    }, [postId, reset]);

    const onSubmit = async (data: CreateReplyInputType) => {
        try {
            await replyApi.createReply(postId, data.content);
            reset({
                postId,
                content: "",
            }); // textarea에 값이 입력되어져 있는 상태이기 때문에 그걸 비우려고
            // reset을 사용하지 않고, setValue 기능을 꺼내와서 setValue("content", "") 해도 됨
            await loadReplies(1);
            await replyApi.getRepliesByPostId(postId);
        } catch (error) {
            console.log("댓글 작성 실패 : ", error);
            alert("댓글 작성 중 오류가 발생했습니다.");
        }
    };

    return (
        <StyledReplyForm onSubmit={handleSubmit(onSubmit)}>
            <div style={{ flex: 1 }}>
                <TextareaGroup
                    style={{ minHeight: "40px" }}
                    placeholder={
                        isLoggedIn
                            ? "토론에 대한 의견을 남겨주세요."
                            : "로그인 후 댓글을 작성할 수 있습니다."
                    }
                    errorMessage={errors.content?.message}
                    registerObj={register("content")}
                    disabled={!isLoggedIn || isSubmitting}
                />
            </div>
            <Button
                color={isLoggedIn ? "primary" : "secondary"}
                variant={"contained"}
                type={"submit"}
                style={{ minWidth: "100px" }}
                disabled={!isLoggedIn || isSubmitting}>
                {isSubmitting ? "등록 중..." : "댓글 등록"}
            </Button>
        </StyledReplyForm>
    );
}

export default ReplyForm;