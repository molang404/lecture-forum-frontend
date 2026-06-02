import axiosInstance from "../axiosInstance.ts";

const createReply = async (postId: number, content: string) => {
    const response = await axiosInstance.post("/reply/create", { postId, content });
    return response.data.data;
};

export default {
    createReply,
};
