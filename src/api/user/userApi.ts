import axiosInstance from "../axiosInstance.ts";
import type { UpdateUserInputType } from "../../schemas/user/updateUserSchema.ts";
import type { UpdatePasswordInputType } from "../../schemas/user/updatePasswordSchema.ts";

const updateUser = async (data: UpdateUserInputType) => {
    const response = await axiosInstance.patch("/user/update", data);
    return response.data.data;
};

const updatePassword = async (data: UpdatePasswordInputType) => {
    await axiosInstance.patch("/user/password", data);
};

export default {
    updateUser,
    updatePassword,
};
