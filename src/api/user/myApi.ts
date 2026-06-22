import axiosInstance from "../axiosInstance.ts";

const getMyDashBoardList = async (postPage: number, replyPage: number, size: number) => {
    const response = await axiosInstance.get("/my/summary", {
        params: {
            postPage,
            replyPage,
            size,
        }
    });
    return response.data.data;
}

export default {
    getMyDashBoardList,
};
