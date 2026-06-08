import axiosInstance from "../axiosInstance.ts";
import type { Notice } from "../../types/notice.type.ts";
import type { PaginationResponseType } from "../../types/common.type.ts";

const getNoticeById = async (noticeId: number): Promise<Notice> => {
    const response = await axiosInstance.get(`/notices/${noticeId}`);
    return response.data.data;
};

const getNoticeList = async (
    page?: number,
    size?: number,
): Promise<PaginationResponseType<Notice>> => {
    const response = await axiosInstance.get(`/notices/list`, {
        params: {
            page,
            size,
        },
    });
    return response.data.data;
};

export default {
    getNoticeById,
    getNoticeList,
};
