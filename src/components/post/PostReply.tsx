import { EmptyMessage, ReplyContainer, ReplyList, ReplyTitle } from "./reply.style.tsx";
import { LuMessageSquare } from "react-icons/lu";
import { useAuthStore } from "../../stores/auth/authStore.ts";
import replyApi from "../../api/user/replyApi.ts";
import { useCallback, useEffect, useState } from "react";
import type { Reply } from "../../types/reply.type.ts";
import ReplyPagination from "../common/pagination/ReplyPagination.tsx";
import ReplyForm from "./reply/ReplyForm.tsx";
import ReplyItem from "./reply/ReplyItem.tsx";

interface Props {
    postId: number;
}

function PostReply({ postId }: Props) {
    // 사용자가 댓글 내용을 입력하고, 그걸 백앤드에게 저장해달라고 요청
    const { isLoggedIn, user } = useAuthStore();
    const [list, setList] = useState<Reply[]>([]);

    // 댓글 목록을 포함해야 하니, pagination도 해야되는데, 얘는 queryString에 포함 시켜야되나?
    // 사용자 목록 또는 글 목록을 할 때에는 페이지네이션 정보를 쿼리스트링에 포함했었음
    // 근데 지금 보면 PostReply 라고 하는 컴포넌트는 PostDetailPage의 컴포넌트로 구상되어져 있음
    // 이 이야기는 지금 사용 중인 주소는 "PostDetailPage"가 출력되는 주소
    // 결국 여기에서 쿼리스트링을 쓰면 /post/7?page=1&size=10 이러한 결과가 됨
    // 이렇게 해도 되지만 주소를 가지고 값을 따져보기엔 모호해짐. 즉, 이건 직관적이지 못 함
    // 그리고 쿼리스트링으로 관리하는 이유는 "뒤로가기" 때문에, 히스토리를 유지하기 위해서 하는 것 (페이지 유지)
    // 여기에서의 내 판단은 "글"이 중심이 되어야지 "댓글"이 중심은 아니다. -> 쿼리스트링 안 씀

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0); // 총 댓글 갯수
    const size = 10;
    const totalPage = Math.max(1, Math.ceil(total / size)); // 총 페이지 매 수
    const [isLoading, setIsLoading] = useState(true);

    // 함수 스코프에 의해서 loadReplies의 page 변수는 부모의 page state가 아니라 page 매개변수임
    const loadReplies = useCallback(
        async (page: number) => {
            try {
                const result = await replyApi.getRepliesByPostId(postId, page, size);
                setList(result.list);
                setTotal(result.total);
                setPage(page);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        },
        [postId],
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadReplies(1).then(() => {});
    }, [loadReplies]);

    // submit을 하는데 zod가 "너 postId 없는데?"라서 진행이 안 됐던 것
    // postId는 PostReply 컴포넌트가 Props를 통해 전달을 받고 있는데
    // 그 값이 react-hook-form이 관리하고 있는 state에 기록이 안돼서
    // 그래서 그걸 postId의 값이 도착하면 useEffect가 발동하면서 react-hook-form의 state에 값을 넣어주도록 함

    return (
        <ReplyContainer>
            <ReplyTitle>
                <LuMessageSquare size={20} />
                댓글 <span className={"count"}>{total}</span>
            </ReplyTitle>

            <ReplyForm postId={postId} loadReplies={loadReplies} isLoggedIn={isLoggedIn} />

            <ReplyList>
                {isLoading ? (
                    <EmptyMessage>댓글을 불러오는 중...</EmptyMessage>
                ) : list.length === 0 ? (
                    <EmptyMessage>가장 먼저 토론에 참여해보세요!</EmptyMessage>
                ) : (
                    list.map(item => (
                        <ReplyItem
                            key={item.id}
                            item={item}
                            user={user}
                            loadReplies={loadReplies}
                        />
                    ))
                )}
            </ReplyList>

            <ReplyPagination currentPage={page} totalPage={totalPage} onPageChange={loadReplies} />
        </ReplyContainer>
    );
}

export default PostReply;
