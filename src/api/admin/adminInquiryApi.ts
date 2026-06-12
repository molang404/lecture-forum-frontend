import axiosInstance from "../axiosInstance.ts";
import type { AdminInquiryAnswerInputType } from "../../schemas/admin/inquiry/adminInquiryAnswerSchema.ts";

const getInquiryList = async (page: number, size: number) => {
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

const updateInquiryAnswer = async (inquiryId: number, input: AdminInquiryAnswerInputType) => {
    const response = await axiosInstance.patch(`/admin/inquiry/${inquiryId}`, input);
    return response.data.data;
};

const deleteInquiryAnswer = async (inquiryId: number) => {
    await axiosInstance.delete(`/admin/inquiry/${inquiryId}`);
};

export default {
    getInquiryList,
    getInquiryById,
    updateInquiryAnswer,
    deleteInquiryAnswer,
};
