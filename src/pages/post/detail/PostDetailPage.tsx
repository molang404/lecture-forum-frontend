import { useCallback, useEffect, useState } from "react";
import type { Post } from "../../../types/post.type.ts";
import { useNavigate, useParams } from "react-router";
import postApi from "../../../api/user/postApi.ts";
import {
    Battleground,
    BattleTitle,
    DetailContent,
    DetailHeader,
    DetailInfo,
    DetailTitle,
    DetailWrapper,
    LoadingText,
    PostContainer,
    ResultBar,
    ResultBarWrapper,
    ResultSection,
    ResultText,
    RevoteButton,
    VoteCard,
    VoteSection,
} from "../../../components/post/post.style.tsx";
import { useAuthStore } from "../../../stores/auth/authStore.ts";
import { AdminButtonGroup } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import {GiCrossedSwords} from "react-icons/gi";
import { LuDroplets, LuFlame, LuRotateCcw } from "react-icons/lu";

function PostDetailPage() {
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isVoting, setIsVoting] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    const { id } = useParams<{ id: string }>();
    const { user, isLoggedIn } = useAuthStore();

    // 글 내용을 백엔드에게서 불러오는 행위를 useEffect 밖에서 하기 위해
    // loadPost 함수를 밖으로 빼게되고,
    // useEffect() 밖에서 만든 함수를 useEffect() 안에서 실행하게 되면
    // 결과값(return)이 바뀌는 행동을 React가 하게 되므로 문법적으로 잘못되었다고 하는 것

    // 이 문법 오류를 해결하기 위해선 useCallback() 리액트 훅을 사용
    // useCallback 사용은 useEffect와 동일하게 사용
    // useCallback(함수, 의존성배열)
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

    // post라고 하는 데이터가 불러잔 이후에 판별 가능
    const hasVoteSystem = !!post.option1Text && !!post.option2Text;
    const totalVotes = post.vote?.totalCount || 0;
    // 전체 투표 수가 0이면, option1 투표한 퍼센트를 50%로 가져가고, opt2도 50%
    // Math.ceil() => 올림
    // Math.round() => 반올림
    const opt1Percent =
        totalVotes > 0 && post.vote ? Math.round((post.vote.option1Count / totalVotes) * 100) : 50;
    const opt2Percent =
        totalVotes > 0 && post.vote ? Math.round((post.vote.option1Count / totalVotes) * 100) : 50;

    const handleVote = async (option: number) => {
        // 들어온 option을 가지고, 백엔드에게 요청
        if (!isLoggedIn) {
            alert("투표에 참여하려면 로그인이 필요합니다.");
            return;
        }

        setIsVoting(true);
        try {
            await postApi.votePost(Number(id), option);
            await loadPost();
        } catch (error) {
            console.log("투표 실패 : ", error);
            alert("투표 처리 중 오류가 발생했습니다.");
        } finally {
            setIsVoting(false);
        }
    };

    const handleCancelVote = async () => {
        if (!confirm("투표를 취소하고 다시 선택하시겠습니까?")) {
            return;
        }

        setIsCanceling(true);
        try {
            await postApi.cancelVotePost(Number(id));
            await loadPost();
        } catch (error) {
            console.log("투표 취소 실패 : ", error);
            alert("투표 취소 처리 중 오류가 발생했습니다.");
        } finally {
            setIsCanceling(false);
        }
    };

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

                {hasVoteSystem && post.vote && (
                    <Battleground>
                        <GiCrossedSwords size={18} color={"#EF4444"} />
                        <BattleTitle>당신의 선택은?</BattleTitle>

                        {/* 지금 사용자가 투표를 했을 때, 투표를 안 했을 때 */}
                        {post.vote.hasVoted ? (
                            // 투표가 되었을 때
                            <ResultSection>
                                <ResultBarWrapper>
                                    <ResultBar $color={"#EF4444"} $width={`${opt1Percent}%`}>
                                        <span className={"label"}>
                                            <LuFlame /> {post.option1Text}
                                        </span>
                                        <span className={"percent"}>
                                            {opt1Percent}% ({post.vote.option1Count}명)
                                        </span>
                                    </ResultBar>
                                    <ResultBar $color={"#3B82F6"} $width={`${opt2Percent}%`}>
                                        <span className={"label"}>
                                            <LuDroplets /> {post.option2Text}
                                        </span>
                                        <span className={"percent"}>
                                            {opt2Percent}% ({post.vote.option2Count}명)
                                        </span>
                                    </ResultBar>
                                </ResultBarWrapper>

                                <ResultText>소중한 한 표가 전황에 반영되었습니다.</ResultText>

                                <RevoteButton onClick={handleCancelVote} disabled={isCanceling}>
                                    <LuRotateCcw size={16} /> 다시 투표하기
                                </RevoteButton>
                            </ResultSection>
                        ) : (
                            // 투표가 안 되었을 때
                            <VoteSection>
                                <VoteCard
                                    $color={"#EF4444"}
                                    onClick={() => handleVote(1)}
                                    disabled={isVoting}>
                                    <LuFlame size={32} />
                                    <h3>{post.option1Text}</h3>
                                    <p>클릭하여 1번에 투표</p>
                                </VoteCard>
                                <VoteCard
                                    $color={"#3B82F6"}
                                    onClick={() => handleVote(2)}
                                    disabled={isVoting}>
                                    <LuDroplets size={32} />
                                    <h3>{post.option2Text}</h3>
                                    <p>클릭하여 2번에 투표</p>
                                </VoteCard>
                            </VoteSection>
                        )}
                    </Battleground>
                )}

                <AdminButtonGroup>
                    <Button color={"secondary"} variant={"contained"} onClick={() => navigate(-1)}>
                        목록으로 이동
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
