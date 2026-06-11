import axiosInstance from "../axiosInstance.ts";

const getInquiryList = async (page: number, size: number) => {
    const response = await axiosInstance.get("/admin/inquiry/list", {
        params: {
            page,
            size,
        },
    });
    return response.data.data;
};

export default {
    getInquiryList,
};
