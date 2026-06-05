import axiosInstance from "../axiosInstance.ts";
import type { Reply } from "../../types/reply.type.ts";
import type { PaginationResponseType } from "../../types/common.type.ts";

const createReply = async (postId: number, content: string) => {
    const response = await axiosInstance.post("/reply/create", { postId, content });
    return response.data.data;
};

const getRepliesByPostId = async (
    postId: number,
    page?: number,
    size?: number,
): Promise<PaginationResponseType<Reply>> => {
    // 이렇게 매개변수에 page와 size를 받는다면 이 getRepliesByPostId 함수를 실행할 때 postId, page, size가 필수값이라는 소리
    // 마찬가지로 axios를 사용할 때 경로에 /reply/${postId}?page=${page}&size=${size} 를 쓰게 되면
    // 저 형식의 주소가 백엔드에게 간다는 이야기

    // 그래서 page 매개변수와 size 매개변수를 ?를 붙여서 선택값으로 바꿔버린다면,
    // 주소는 어떻게 되어서 백엔드에게 전송될까?    getRepliesByPostId(5)   => 백엔드에게 /reply/5 라고만 요청하고 싶음
    // /reply/5?page=undefined&size=undefined

    const response = await axiosInstance.get(`/reply/${postId}`, {
        params: {
            page,
            size,
        },
    });

    // 이런 저러한 이유로, axios를 사용하면서 쿼리스트링을 붙이고 싶다면
    // 옵션 자리에 객체를 넣고 params 항목을 담아서 거기에 프로퍼티(항목)을 넣어주면
    // axios가 경로에 쿼리스트링을 조합하여 붙여줌

    return response.data.data;
};

const deleteReply = async (replyId: number): Promise<void> => {
    await axiosInstance.delete(`/reply/${replyId}`);
};

export default {
    createReply,
    getRepliesByPostId,
    deleteReply,
};
