import { GiCrossedSwords } from "react-icons/gi";
import {
    BattleGround,
    BattleTitle,
    ResultBar,
    ResultBarWrapper,
    ResultSection,
    ResultText,
    RevoteButton,
    VoteCard,
    VoteSection,
} from "./post.style.tsx";
import { LuDroplets, LuFlame, LuRotateCcw } from "react-icons/lu";
import type { Post } from "../../types/post.type.ts";
import postApi from "../../api/user/postApi.ts";
import { useState } from "react";
import { useAuthStore } from "../../stores/auth/authStore.ts";

interface Props {
    post: Post;
    loadPost: () => Promise<void>;
}

function PostVote({ post, loadPost }: Props) {
    const [isVoting, setIsVoting] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const { isLoggedIn } = useAuthStore();

    if (!post.vote) {
        return null;
    }

    // post라고 하는 데이터가 불러온 이후에나 판별이 가능
    const totalVotes = post.vote?.totalCount || 0;
    // 전체 투표 수가 0이면, option1 투표한 퍼센트를 50%로 가져가고, opt2 투표한 퍼센트도 50%
    // Math.ceil() => 올림
    // Math.round(값, ) => 반올림
    const opt1Percent =
        totalVotes > 0 && post.vote ? Math.round((post.vote.option1Count / totalVotes) * 100) : 50;
    const opt2Percent =
        totalVotes > 0 && post.vote ? Math.round((post.vote.option2Count / totalVotes) * 100) : 50;

    const handleVote = async (option: number) => {
        // 들어온 option을 가지고, 백엔드에게 요청
        if (!isLoggedIn) {
            alert("투표에 참여하려면 로그인이 필요합니다.");
            return;
        }

        setIsVoting(true);
        try {
            await postApi.votePost(Number(post.id), option);
            // 여기서 글 내용을 다시 받아와야 할 필요가 있음
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
            await postApi.cancelVotePost(Number(post.id));
            await loadPost();
        } catch (error) {
            console.log("투표 취소 실패 : ", error);
            alert("투표 취소 처리 중 오류가 발생했습니다.");
        } finally {
            setIsCanceling(false);
        }
    };

    return (
        <BattleGround>
            <GiCrossedSwords size={18} color={"#EF4444"} />
            <BattleTitle>당신의 선택은?</BattleTitle>

            {/* 지금 현재 사용자가 투표를 했을 때, 투표를 안 했을 때 */}
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
                // 투표가 안되었을 때
                <VoteSection>
                    <VoteCard $color={"#EF4444"} onClick={() => handleVote(1)} disabled={isVoting}>
                        <LuFlame size={32} />
                        <h3>{post.option1Text}</h3>
                        <p>클릭하여 1번에 투표</p>
                    </VoteCard>
                    <VoteCard $color={"#3B82F6"} onClick={() => handleVote(2)} disabled={isVoting}>
                        <LuDroplets size={32} />
                        <h3>{post.option2Text}</h3>
                        <p>클릭하여 2번에 투표</p>
                    </VoteCard>
                </VoteSection>
            )}
        </BattleGround>
    );
}

export default PostVote;
