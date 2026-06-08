import type { NoticeInputType } from "../../schemas/notice/noticeSchema.ts";
import axiosInstance from "../axiosInstance.ts";
import type { Notice } from "../../types/notice.type.ts";

const createNotice = async (input: NoticeInputType): Promise<Notice> => {
    // 생성 페이지에서 사용자에게 input, textarea를 통해 title과 content를 입력 받아서
    // react-hook-form이 onSubmit에 입력값을 넣어줄 것이고
    // 이 함수는 매개변수로 그걸 받아올 것이다.
    const response = await axiosInstance.post("/admin/notice/create", input);
    return response.data.data;
};

const updateNotice = async (noticeId: number, input: NoticeInputType): Promise<Notice> => {
    const response = await axiosInstance.patch(`/admin/notice/${noticeId}`, input);
    return response.data.data;
};

const deleteNotice = async (noticeId: number): Promise<void> => {
    await axiosInstance.delete(`/admin/notice/${noticeId}`);     // 성공 / 실패
};

export default {
    createNotice,
    updateNotice,
    deleteNotice,
};