import type { PaginationResponseType } from "../../types/common.type.ts";
import type { Inquiry } from "../../types/inquiry.type.ts";
import axiosInstance from "../axiosInstance.ts";

const getInquiryList = async (
    page?: number,
    size?: number,
): Promise<PaginationResponseType<Inquiry>> => {
    const response = await axiosInstance.get("/admin/inquiry/list", {
        params: {
            page,
            size,
        },
    });
    return response.data.data;
};

const getInquiryById = async (inquiryId: number) => {
    const response = await axiosInstance.get(`/admin/inquiry/${inquiryId}`);
    return response.data.data;
};

export default {
    getInquiryList,
    getInquiryById,
};
