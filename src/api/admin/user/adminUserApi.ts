import axiosInstance from "../../axiosInstance.ts";
import type { User } from "../../../types/user.type.ts";
import type { AdminCreateUserInputType } from "../../../schemas/admin/user/adminCreateUserSchema.ts";
import type { AdminUpdateUserInputType } from "../../../schemas/admin/user/adminUpdateUserSchema.ts";

const fetchUserList = async (): Promise<User[]> => {
    const response = await axiosInstance.get("/admin/user/list");
    return response.data.data;
};

const fetchUserById = async (id: number): Promise<User> => {
    const response = await axiosInstance.get(`/admin/user/${id}`);
    return response.data.data;
}

const createUser = async (data: AdminCreateUserInputType): Promise<User> => {
    const response = await axiosInstance.post("/admin/user/create", data);
    return response.data.data;
};

const updateUser = async (id: number, data: AdminUpdateUserInputType): Promise<User> => {
    const response = await axiosInstance.put(`/admin/user/${id}`, data);
    return response.data.data;
};

const deleteUser = async (id: number): Promise<User> => {
    const response = await axiosInstance.patch(`/admin/user/${id}/delete`);
    return response.data.data;
};

export default {
    fetchUserList,
    createUser,
    updateUser,
    fetchUserById,
    deleteUser,
};