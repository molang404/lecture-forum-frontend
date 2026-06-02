import { useCallback, useEffect, useState } from "react";
import type { Post } from "../../../types/post.type.ts";
import { useNavigate, useParams } from "react-router";
import postApi from "../../../api/user/postApi.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    LoadingText,
    PostContainer,
} from "../../../components/post/post.style.tsx";
import { useAuthStore } from "../../../stores/auth/authStore.ts";
import { AdminButtonGroup } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import PostVote from "../../../components/post/PostVote.tsx";

function PostDetailPage() {
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams<{ id: string }>();
    const { user } = useAuthStore();

    // 글 내용을 백엔드에게서 불러오는 행위를 useEffect 밖에서 하기 위해
    // loadPost 함수를 밖으로 빼게되고,
    // useEffect() 밖에서 만든 함수를 useEffect() 안에서 실행하게 되면
    // 결과값(return)이 바뀌는 행동을 React가 하게 되므로 문법적으로 잘못되었다고 하는 것

    // 이 문법 오류를 해결하기 위해선 useCallback() 리액트 훅을 사용
    // useCallback 사용은 useEffect와 동일하게 사용
    // useCallback(함수, 의존성배열)

    // 글 내용을 다시 불러오는 함수
    // -> 백엔드에게 요청해서 받아온 데이터를 post라는 state에 덮어쓰는 함수
    // => post 라는 state가 존재하는 곳에 위치해야 함
    // => 근데 PostVote에서 써야하는데 옮기는 건 안됨 -> Props로 전달 받아야 함
    const loadPost = useCallback(async () => {
        try {
            const data = await postApi.fetchPostById(Number(id));
            // 여기서 글 내용을 다시 받아와야 할 필요가 있음
            setPost(data);
        } catch (error) {
            console.log(error);
            alert("게시글을 불러오는 중 오류가 발생했습니다.");
            navigate(-1);
        } finally {
            setIsLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPost().then(() => {});
    }, [id, loadPost]);

    if (isLoading) {
        return (
            <PostContainer>
                <LoadingText>글 내용을 불러오는 중입니다...</LoadingText>
            </PostContainer>
        );
    }

    if (!post) return;

    return (
        <PostContainer>
            <DetailWrapper>
                <DetailHeader>
                    <DetailTitle>{post.title}</DetailTitle>
                    <DetailInfo>
                        <div className={"left-info"}>
                            <span>
                                <p>{post.user.nickname}</p>
                            </span>
                            <span>
                                {new Date(post.createdAt).toLocaleString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        <div className={"right-info"}>
                            <span>조회 &nbsp;{post.views}</span>
                        </div>
                    </DetailInfo>
                </DetailHeader>

                <DetailContent>{post.content}</DetailContent>

                <PostVote post={post} loadPost={loadPost} />

                <AdminButtonGroup>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로
                    </Button>

                    {user?.id === post.user.id && (
                        <>
                            <Button color={"warning"} variant={"contained"}>
                                수정
                            </Button>
                            <Button color={"error"} variant={"contained"}>
                                삭제
                            </Button>
                        </>
                    )}
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default PostDetailPage;
