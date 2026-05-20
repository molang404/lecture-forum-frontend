import axiosInstance from "../axiosInstance.ts";
import type { Category } from "../../types/category.type.ts";

const fetchCategoryList = async (): Promise<Category[]> => {
    const response = await axiosInstance.get("/admin/category/list");
    return response.data.data;
};

// 카테고리 등록 API

// 카테고리 수정 API

export default {
    fetchCategoryList,
};