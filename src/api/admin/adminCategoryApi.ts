import axiosInstance from "../axiosInstance.ts";
import type { Category } from "../../types/category.type.ts";
import type {AdminCreateCategoryInputType} from "../../schemas/admin/category/adminCreateCategorySchema.ts";

const fetchCategoryList = async (): Promise<Category[]> => {
    const response = await axiosInstance.get("/admin/category/list");
    return response.data.data;
};

// 카테고리 등록 API
const createCategory = async (data: AdminCreateCategoryInputType) => {
    const response = await axiosInstance.post("/admin/category/create", data);
    return response.data.data;
}

// 카테고리 수정 API


// 카테고리 온오프 API
const toggleCategoryStatus = async (id: number) => {
    const response = await axiosInstance.patch(`/admin/category/${id}/status`);
    return response.data.data;
}

export default {
    fetchCategoryList,
    createCategory,
    toggleCategoryStatus,
};