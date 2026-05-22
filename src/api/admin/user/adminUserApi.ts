import axiosInstance from "../../axiosInstance.ts";
import type { User } from "../../../types/user.type.ts";
import type { AdminCreateUserInputType } from "../../../schemas/admin/user/adminCreateUserSchema.ts";

const fetchUserList = async (): Promise<User[]> => {
    const response = await axiosInstance.get("/admin/user/list");
    return response.data.data;
};

const createUser = async (data: AdminCreateUserInputType): Promise<User> => {
    const response = await axiosInstance.post("/admin/user/create", data);
    return response.data.data;
};

export default {
    fetchUserList,
    createUser,
};