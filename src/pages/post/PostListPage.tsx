import { Link, useParams, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import postApi from "../../api/user/postApi.ts";
import type { Post } from "../../types/post.type.ts";
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
import Button from "../../components/common/button/Button.tsx";
import {useAuthStore} from "../../stores/auth/authStore.ts";
import Pagination from "../../components/common/pagination/Pagination.tsx";

function PostListPage() {
    // 주소를 통해 categoryId가 옴
    // 쿼리스트링을 통해 page와 size가 옴
    // 그것을 가지고 백엔드에 요청을 보내야 됨
    // 요청을 통해 들어온 데이터는 { total, size, page, list } 모양으로 오고
    // 그것을 화면에 map을 돌려서 출력해야 됨
    // 그리고 페이지네이션 할 수 있는 버튼들도 하단에 추가

    const { isLoggedIn } = useAuthStore();
    const { categoryId } = useParams<{ categoryId: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const size = Number(searchParams.get("size")) || 20;

    const [list, setList] = useState<Post[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalPage = Math.ceil(total / size);


    useEffect(() => {
        const loadList = async () => {
            try {
                const data = await postApi.fetchPostListByCategory(Number(categoryId), page, size);
                setList(data.list);
                setTotal(data.total);
            } catch (error) {
                console.log(error);
                alert("게시글을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        window.scrollTo({ top: 0, behavior: "smooth" });
        loadList().then(() => {});
    }, [page, categoryId, size]);

    const onPageChange = (page: number) => {
        searchParams.set("page", page.toString()); // searchParams 내부의 page 프로퍼티 값을 변경
        setSearchParams(searchParams);
    };

    // 게시판 목록, 게시글 상세, 게시글 작성, 게시글 수정
    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>
                    게시판 <small>총 {total}개의 글</small>
                </PostTitle>
                {isLoggedIn && (
                    <Button
                        color="primary"
                        variant={"contained"}
                        as={Link}
                        to={`/post/create/${categoryId}`}>
                        글쓰기
                    </Button>
                )}
            </PostPageHeader>

            <BoardWrapper>
                {isLoading ? (
                    <LoadingText>게시글을 불러오는 중입니다.</LoadingText>
                ) : (
                    <BoardTable>
                        <thead>
                            <tr>
                                <BoardTh $width={"10%"}>번호</BoardTh>
                                <BoardTh>제목</BoardTh>
                                <BoardTh $width={"15%"}>작성자</BoardTh>
                                <BoardTh $width={"15%"}>작성일</BoardTh>
                                <BoardTh $width={"10%"}>조회수</BoardTh>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length === 0 && (
                                <tr>
                                    <BoardTd colSpan={5} style={{ padding: "100px 0" }}>
                                        아직 작성된 게시글이 없습니다. 첫 글을 남겨주세요!
                                    </BoardTd>
                                </tr>
                            )}
                            {list.map(item => (
                                <tr key={item.id}>
                                    <BoardTd>{item.id}</BoardTd>
                                    <BoardTd className={"title-cell"}>{item.title}</BoardTd>
                                    <BoardTd>{item.user.nickname}</BoardTd>
                                    <BoardTd>
                                        {/*
                                            Date 클래스인 메서드 중 toLocaleString()은
                                            해당 날짜를 지역 시간에 맞게 문자열로 변환하는 메서드
                                            매개 변수를 생략하면 자동으로 보는 사용자에 맞춰 제공됨
                                            .toLocaleString(해당 지역, 옵션 객체)
                                        */}
                                        {new Date(item.createdAt).toLocaleString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </BoardTd>
                                    <BoardTd>{item.views}</BoardTd>
                                </tr>
                            ))}
                        </tbody>
                    </BoardTable>
                )}
            </BoardWrapper>

            <Pagination currentPage={page} totalPage={totalPage} onPageChange={onPageChange} />
        </PostContainer>
    );
}

export default PostListPage;
