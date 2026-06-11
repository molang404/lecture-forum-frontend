import axiosInstance from "../axiosInstance.ts";
import type { PaginationResponseType } from "../../types/common.type.ts";
import type { Post } from "../../types/post.type.ts";
import type {CreatePostInputType} from "../../schemas/post/createPostSchema.ts";

const fetchPostListByCategory = async (categoryId: number, page: number, size: number): Promise<PaginationResponseType<Post>> => {
    const response = await axiosInstance.get(`/post/list/${categoryId}?page=${page}&size=${size}`);
    return response.data.data;
};

const fetchPostById = async (id: number): Promise<Post> => {
    const response = await axiosInstance.get(`/post/${id}`);
    return response.data.data;
};

const createPost = async (data: CreatePostInputType) => {
    const response = await axiosInstance.post("/post/create", data);
    return response.data.data;
};

const deletePost = async (postId: number) => {
    await axiosInstance.delete(`/post/${postId}`);
};

const votePost = async (postId: number, option: number) => {
    await axiosInstance.post(`/post/${postId}/vote`, { option });
    // 백엔드가 처리 후 응답(Response)하는 내용이 필요 없으면 return 안해도 됨
};

const cancelVotePost = async (postId: number) => {
    await axiosInstance.delete(`/post/${postId}/vote`);
};

export default {
    fetchPostListByCategory,
    createPost,
    fetchPostById,
    deletePost,
    votePost,
    cancelVotePost,
};
