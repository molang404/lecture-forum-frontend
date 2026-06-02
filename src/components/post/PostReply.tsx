import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type CreateReplyInputType,
    createReplySchema,
} from "../../schemas/reply/createReplySchema.ts";
import { ReplyContainer, ReplyForm, ReplyTitle } from "./reply.style.tsx";
import { LuMessageSquare } from "react-icons/lu";
import TextareaGroup from "../common/textarea/TextareaGroup.tsx";
import Button from "../common/button/Button.tsx";
import { useAuthStore } from "../../stores/auth/authStore.ts";
import replyApi from "../../api/user/replyApi.ts";
import { useEffect } from "react";

interface Props {
    postId: number;
}

function PostReply({ postId }: Props) {
    // 사용자가 댓글 내용을 입력하고, 그걸 백앤드에게 저장해달라고 요청
    const { isLoggedIn } = useAuthStore();

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

    // submit을 하는데 zod가 "너 postId 없는데?"라서 진행이 안됐던 것
    // postId는 PostReply 컴포넌트가 Props를 통해 전달 받고 있는데
    // 

    const onSubmit = async (data: CreateReplyInputType) => {
        try {
            await replyApi.createReply(postId, data.content);
            reset(); // textarea에 값이 입력되어져 있는 상태이기 때문에 그걸 비우려고
            // TODO : 댓글 목록을 다시 불러와야 함
        } catch (error) {
            console.log("댓글 작성 실패 : ", error);
            alert("댓글 작성 중 오류가 발생했습니다.");
        }
    };

    return (
        <ReplyContainer>
            <ReplyTitle>
                <LuMessageSquare size={20} />
                댓글 <span className={"count"}>0</span>
            </ReplyTitle>

            <ReplyForm onSubmit={handleSubmit(onSubmit)}>
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
            </ReplyForm>
        </ReplyContainer>
    );
}

export default PostReply;
