import axiosInstance from "../axiosInstance.ts";
import type { Category } from "../../types/category.type.ts";

const fetchCategoryList = async (): Promise<Category[]> => {
  const response = await axiosInstance.get("/category");
  return response.data.data;
};

export default {
    fetchCategoryList,
}