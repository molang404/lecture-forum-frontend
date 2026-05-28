import axiosInstance from "../axiosInstance.ts";
import type { PaginationResponseType } from "../../types/common.type.ts";
import type { Post } from "../../types/post.type.ts";
import type {CreatePostInputType} from "../../schemas/post/createPostSchema.ts";

const fetchPostListByCategory = async (categoryId: number, page: number, size: number): Promise<PaginationResponseType<Post>> => {
    const response = await axiosInstance.get(`/post/list/${categoryId}?page=${page}&size=${size}`);
    return response.data.data;
};

const createPost = async (data: CreatePostInputType) => {
    const response = await axiosInstance.post("/post/create", data)
    return response.data.data;
}

export default {
    fetchPostListByCategory,
    createPost,
};
