import { useEffect, useState } from "react";
import myApi from "../../api/user/myApi.ts";
import type { Post } from "../../types/post.type.ts";
import type { Reply } from "../../types/reply.type.ts";
import {
    BoardTable,
    BoardTd,
    BoardTh,
    BoardWrapper,
    LoadingText,
    PostContainer,
    PostPageHeader,
    PostTitle,
} from "../../components/post/post.style.tsx";
import { FiEdit, FiUserPlus } from "react-icons/fi";
import Button from "../../components/common/button/Button.tsx";
import { Link } from "react-router";
import { DashboardTitle, DashboardWrapper } from "../../components/common/dashboard/Dashboard.tsx";
import Pagination from "../../components/common/pagination/Pagination.tsx";

function MyInfoPage() {
    const [postPage, setPostPage] = useState(1);
    const [replyPage, setReplyPage] = useState(1);
    const SIZE = 5;
    const [postList, setPostList] = useState<Post[]>([]);
    const [replyList, setReplyList] = useState<Reply[]>([]);
    const [postTotal, setPostTotal] = useState(0);
    const [replyTotal, setReplyTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await myApi.getMyDashBoardList(postPage, replyPage, SIZE);
                setPostList(data.posts);
                setReplyList(data.replies);
                setPostTotal(data.postTotal);
                setReplyTotal(data.replyTotal);
            } catch (error) {
                console.log(error);
                alert("내 활동 목록을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadPost().then(() => {});
    }, [postPage, replyPage]);

    const postTotalPage = Math.ceil(postTotal / 5);
    const replyTotalPage = Math.ceil(replyTotal / 5);

    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>
                    내 활동 <small>내 기록들을 편하게 확인해보세요.</small>
                </PostTitle>
                <Button color={"primary"} variant={"icon"}>
                    <FiUserPlus size={18} />
                </Button>
            </PostPageHeader>

            <DashboardWrapper>
                <DashboardTitle>내 작성 게시물</DashboardTitle>
                <BoardWrapper>
                    {isLoading ? (
                        <LoadingText>게시물 활동 목록을 불러오는 중입니다...</LoadingText>
                    ) : (
                        <BoardTable>
                            <thead>
                                <tr>
                                    <BoardTh $width={"10%"}>번호</BoardTh>
                                    <BoardTh>제목</BoardTh>
                                    <BoardTh $width={"13%"}>작성일</BoardTh>
                                    <BoardTh $width={"11%"}>조회수</BoardTh>
                                    <BoardTh $width={"10%"}>관리</BoardTh>
                                </tr>
                            </thead>
                            <tbody>
                                {postList.length === 0 && (
                                    <tr>
                                        <BoardTd colSpan={5} style={{ padding: "100px 0" }}>
                                            아직 작성된 게시글이 없습니다.
                                            <Button
                                                color={"primary"}
                                                variant={"contained"}
                                                as={Link}
                                                to={"/category/1"}>
                                                등록하러 가기
                                            </Button>
                                        </BoardTd>
                                    </tr>
                                )}
                                {postList.map(item => (
                                    <tr key={item.id}>
                                        <BoardTd>{item.id}</BoardTd>
                                        <BoardTd className={"title-cell"}>
                                            <Link to={`/post/${item.id}`}>{item.title}</Link>
                                        </BoardTd>
                                        <BoardTd>
                                            {new Date(item.createdAt).toLocaleString("ko-KR", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            })}
                                        </BoardTd>
                                        <BoardTd>{item.views}</BoardTd>
                                        <BoardTd>
                                            <Button
                                                color={"primary"}
                                                variant={"icon"}
                                                as={Link}
                                                to={`/post/${item.id}`}>
                                                <FiEdit size={18} />
                                            </Button>
                                        </BoardTd>
                                    </tr>
                                ))}
                            </tbody>
                        </BoardTable>
                    )}
                </BoardWrapper>
                <Pagination
                    currentPage={postPage}
                    totalPage={postTotalPage}
                    onPageChange={setPostPage}
                />
            </DashboardWrapper>

            <DashboardWrapper>
                <DashboardTitle>내 작성 댓글</DashboardTitle>
                <BoardWrapper>
                    {isLoading ? (
                        <LoadingText>댓글 활동 목록을 불러오는 중입니다...</LoadingText>
                    ) : (
                        <BoardTable>
                            <thead>
                                <tr>
                                    <BoardTh $width={"5%"}>번호</BoardTh>
                                    <BoardTh>댓글</BoardTh>
                                    <BoardTh $width={"20%"}>댓글 작성일</BoardTh>
                                    <BoardTh $width={"5%"}>관리</BoardTh>
                                </tr>
                            </thead>
                            <tbody>
                                {postList.length === 0 && (
                                    <tr>
                                        <BoardTd colSpan={5} style={{ padding: "100px 0" }}>
                                            아직 작성된 댓글이 없습니다.
                                            <Button
                                                color={"primary"}
                                                variant={"contained"}
                                                as={Link}
                                                to={"/category/1"}>
                                                등록하러 가기
                                            </Button>
                                        </BoardTd>
                                    </tr>
                                )}
                                {replyList.map(item => (
                                    <tr key={item.id}>
                                        <BoardTd>{item.id}</BoardTd>
                                        <BoardTd>{item.content}</BoardTd>
                                        <BoardTd>
                                            {new Date(item.createdAt).toLocaleString("ko-KR", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            })}
                                        </BoardTd>
                                        <BoardTd>
                                            <Button
                                                color={"primary"}
                                                variant={"icon"}
                                                as={Link}
                                                to={`/post/${item.postId}`}>
                                                <FiEdit size={18} />
                                            </Button>
                                        </BoardTd>
                                    </tr>
                                ))}
                            </tbody>
                        </BoardTable>
                    )}
                </BoardWrapper>

                <Pagination
                    currentPage={replyPage}
                    totalPage={replyTotalPage}
                    onPageChange={setReplyPage}
                />
            </DashboardWrapper>
        </PostContainer>
    );
}

export default MyInfoPage;
