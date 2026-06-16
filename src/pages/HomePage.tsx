import { useEffect, useState } from "react";
import type { RecentPost } from "../types/post.type.ts";
import postApi from "../api/user/postApi.ts";
import { BoardTable, BoardTd, BoardTh, BoardWrapper, PostContainer, PostPageHeader, PostTitle } from "../components/post/post.style.tsx";
import Badge from "../components/common/badge/Badge.tsx";
import { Link } from "react-router";

function HomePage() {
    const [list, setList] = useState<RecentPost[]>([]);
    useEffect(() => {
        const loadRecent = async () => {
            try {
                const result = await postApi.fetchRecentPostList();
                setList(result);
            } catch (error) {
                console.log(error);
            }
        };

        loadRecent().then(() => {});
    }, []);

    return <PostContainer>
        <PostPageHeader>
            <PostTitle>실시간 토론내난투 <small>지금 가장 뜨겁게 올라운 주제들입니다.</small></PostTitle>
        </PostPageHeader>

        <BoardWrapper>
            <BoardTable>
                <thead>
                <tr>
                    <BoardTh $width={"15%"}>분류</BoardTh>
                    <BoardTh $width={"55%"}>제목</BoardTh>
                    <BoardTh $width={"15%"}>작성자</BoardTh>
                    <BoardTh $width={"15%"}>등록 시간</BoardTh>
                </tr>
                </thead>
                <tbody>
                {list.length === 0 && (
                    <tr>
                        <BoardTd colSpan={4} style={{ padding: "100px 0" }}>
                            현재 등록된 실시간 토론이 없습니다.
                        </BoardTd>
                    </tr>
                )}
                {list.map(item => (
                    <tr key={item.id}>
                        <BoardTd>
                            <Badge color={"primary"}>{item.category.name}</Badge>
                        </BoardTd>
                        <BoardTd>
                            <Link to={`post/${item.id}`}>{item.title}</Link>
                        </BoardTd>
                        <BoardTd>{item.user.nickname}</BoardTd>
                        <BoardTd>
                            {new Date(item.createdAt).toLocaleString()}
                        </BoardTd>
                    </tr>
                ))}
                </tbody>
            </BoardTable>
        </BoardWrapper>
    </PostContainer>;
}

export default HomePage;
