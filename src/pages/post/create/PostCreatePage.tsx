import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type CreatePostInputType,
    createPostSchema,
} from "../../../schemas/post/createPostSchema.ts";
import {
    FormDivider,
    FormWrapper,
    PostContainer,
    PostPageHeader,
    PostTitle,
    VoteFieldFlex,
    VoteSectionDescription,
    VoteSectionTitle,
} from "../../../components/post/post.style.tsx";
import { GiCrossedSwords } from "react-icons/gi";
import InputGroup from "../../../components/common/input/InputGroup.tsx";
import TextareaGroup from "../../../components/common/textarea/TextareaGroup.tsx";
import { AdminButtonGroup } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import { useNavigate, useParams } from "react-router";
import postApi from "../../../api/user/postApi.ts";
import { useEffect } from "react";

function PostCreatePage() {
    const navigate = useNavigate();
    const { categoryId } = useParams<{ categoryId: string }>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createPostSchema),
        mode: "onBlur",
    });

    // 초기 렌더링이 끝나고,
    // useParams가 주소값에서 categoryId를 가져오면,
    // 그 때 useForm이 관리하는 state 중 categoryId의 값을 업데이트 하자

    useEffect(() => {
        if (categoryId) {
            reset({ categoryId: Number(categoryId) });
        }
    }, [categoryId, reset]);

    const onSubmit = async (input: CreatePostInputType) => {
        try {
            await postApi.createPost(input);
            // 1. 사용자를 게시글 목록으로 이동
            // 2. 이렇게 등록된 글의 상세 페이지로 이동
            navigate(`/category/${categoryId}`);
        } catch (error) {
            console.log(error);
            alert("게시글 등록에 실패했습니다.");
        }
    };

    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>
                    <GiCrossedSwords size={26} style={{ color: "#EF4444" }} />
                    대난투 등록 <small>새로운 토론 주제 던지기</small>
                </PostTitle>
            </PostPageHeader>

            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <InputGroup
                    label={"토론 제목"}
                    id={"title"}
                    placeholder={"예시) 짜장면 vs 짬뽕, 일생일대의 선택은?"}
                    errorMessage={errors.title?.message}
                    registerObj={register("title")}
                />
                <TextareaGroup
                    label={"주제 발제 (본문)"}
                    id={"content"}
                    placeholder={
                        "자신의 의견을 지지해줄 근거와 함께 토론 주제를 상세히 작성해주세요."
                    }
                    errorMessage={errors.content?.message}
                    registerObj={register("content")}
                />

                <FormDivider />

                <VoteSectionTitle>
                    <GiCrossedSwords size={18} />
                    실시간 대난투 투표 설정 <small>(선택사항)</small>
                </VoteSectionTitle>
                <VoteSectionDescription>
                    항목을 입력하면 상세 페이지에 실시간 투표 선택지가 생성됩니다.
                </VoteSectionDescription>

                <VoteFieldFlex>
                    <InputGroup
                        label={"1번 선택지 항목"}
                        id={"option1Text"}
                        placeholder={"예시) 평생 짜장면 먹기"}
                        wrap={true}
                        registerObj={register("option1Text")}
                    />
                    <InputGroup
                        label={"2번 선택지 항목"}
                        id={"option2Text"}
                        placeholder={"예시) 평생 짬뽕 먹기"}
                        wrap={true}
                        registerObj={register("option2Text")}
                    />
                </VoteFieldFlex>

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

export default PostCreatePage;
