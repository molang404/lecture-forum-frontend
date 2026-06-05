import { ReplyContent, ReplyHeader, StyledReplyItem } from "../reply.style.tsx";
import type { Reply } from "../../../types/reply.type.ts";
import type { User } from "../../../types/user.type.ts";
import replyApi from "../../../api/user/replyApi.ts";
import { useState } from "react";
import ReplyForm from "./ReplyForm.tsx";

interface Props {
    item: Reply;
    user: User | null;
    loadReplies: (page: number) => Promise<void>;
}

function ReplyItem({ item, user, loadReplies }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    const handleDeleteReply = async (replyId: number) => {
        if (!confirm("정말 이 댓글을 삭제하시겠습니까?")) return;

        try {
            await replyApi.deleteReply(replyId);
            await loadReplies(1);
        } catch (error) {
            console.log("댓글 삭제 실패 : ", error);
            alert("댓글 삭제 중 오류가 발생되었습니다.");
        }
    };

    return (
        <StyledReplyItem key={item.id}>
            <ReplyHeader>
                <div className={"author-info"}>
                    <strong>{item.user.nickname}</strong>
                    <span className={"date"}>
                        {new Date(item.createdAt).toLocaleString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            second: "2-digit",
                        })}
                    </span>
                </div>
                {user?.id === item.userId && (
                    <div style={{ display: "flex", gap: "6px" }}>
                        <button className={"modify-btn"} onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "취소" : "수정"}
                        </button>
                        <button className={"delete-btn"} onClick={() => handleDeleteReply(item.id)}>
                            삭제
                        </button>
                    </div>
                )}
            </ReplyHeader>
            {isEditing ? (
                <ReplyForm
                    postId={item.postId}
                    loadReplies={loadReplies}
                    isLoggedIn={!!user}
                    isEditing={isEditing}
                    initialContent={item.content}
                    replyId={item.id}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <ReplyContent>{item.content}</ReplyContent>
            )}
        </StyledReplyItem>
    );
}

export default ReplyItem;
