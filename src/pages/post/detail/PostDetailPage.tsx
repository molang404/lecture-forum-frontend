import { useEffect, useState } from "react";
import type { Post } from "../../../types/post.type.ts";
import { useNavigate, useParams } from "react-router";
import postApi from "../../../api/user/postApi.ts";
import {
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    PostContainer,
} from "../../../components/post/post.style.tsx";
import { useAuthStore } from "../../../stores/auth/authStore.ts";
import { AdminButtonGroup } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";

function PostDetailPage() {
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams<{ id: string }>();
    const { user } = useAuthStore();

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await postApi.fetchPostById(Number(id));
                setPost(data);
            } catch (error) {
                console.log(error);
                alert("게시글을 불러오는 중 오류가 발생했습니다.");
                navigate(-1);
            } finally {
                setIsLoading(false);
            }
        };

        loadPost().then(() => {});
    }, [id, navigate]);

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

                <AdminButtonGroup>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로 이동
                    </Button>

                    {user?.id === post.user.id && (<>
                        <Button color={"warning"} variant={"contained"}>
                            수정
                        </Button>
                        <Button color={"error"} variant={"contained"}>
                            삭제
                        </Button>
                    </>)}
                </AdminButtonGroup>
            </DetailWrapper>
        </PostContainer>
    );
}

export default PostDetailPage;
