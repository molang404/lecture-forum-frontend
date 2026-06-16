import axiosInstance from "../axiosInstance.ts";

const adminDashBoardList = async () => {
    const response = await axiosInstance.get(`/admin/summary`);
    return response.data.data;
};

export default {
    adminDashBoardList,
}