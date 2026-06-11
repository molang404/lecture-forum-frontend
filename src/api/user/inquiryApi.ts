import axiosInstance from "../axiosInstance.ts";

const getMyInquiryList = async (page: number, size: number) => {
    const response = await axiosInstance.get("/inquiry/list", {
        params: {
            page,
            size,
        },
    });
    return response.data.data;
};

export default {
    getMyInquiryList,
};