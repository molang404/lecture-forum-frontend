import axiosInstance from "../../axiosInstance.ts";
import type { User } from "../../../types/user.type.ts";

const fetchUserList = async (): Promise<User[]> => {
    const response = await axiosInstance.get("/admin/user/list");
    return response.data.data;
};

export default {
    fetchUserList,
};