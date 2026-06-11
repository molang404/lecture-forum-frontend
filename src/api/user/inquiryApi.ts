import axiosInstance from "../axiosInstance.ts";
import type { InquiryInputType } from "../../schemas/inquiry/inquirySchema.ts";
import type { Inquiry } from "../../types/inquiry.type.ts";

const getMyInquiryList = async (page: number, size: number) => {
    const response = await axiosInstance.get("/inquiry/list", {
        params: {
            page,
            size,
        },
    });
    return response.data.data;
};

const getMyInquiryById = async (inquiryId: number): Promise<Inquiry> => {
    const response = await axiosInstance.get(`/inquiry/${inquiryId}`);
    return response.data.data;
};

const createMyInquiry = async (input: InquiryInputType): Promise<Inquiry> => {
    const response = await axiosInstance.post("/inquiry/create", input);
    return response.data.data;
};

const updateMyInquiry = async (inquiryId: number, input: InquiryInputType): Promise<Inquiry> => {
    const response = await axiosInstance.patch(`/inquiry/${inquiryId}`, input);
    return response.data.data;
};

const deleteMyInquiry = async (inquiryId: number): Promise<void> => {
    await axiosInstance.delete(`/inquiry/${inquiryId}`);
};

export default {
    getMyInquiryList,
    getMyInquiryById,
    createMyInquiry,
    updateMyInquiry,
    deleteMyInquiry,
};
