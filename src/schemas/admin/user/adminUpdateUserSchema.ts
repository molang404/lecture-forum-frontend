import { z } from "zod";
import { Gender, Role } from "../../../types/user.type.ts";

export const adminUpdateUserSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(6).optional(),
    name: z.string().min(2),
    nickname: z.string().min(2).max(10),
    email: z.email(),
    phoneNumber: z.string().optional(),
    birthdate: z.string().optional(),
    gender: z.enum(Gender),
    role: z.enum(Role),
});

export type AdminUpdateUserInputType = z.infer<typeof adminUpdateUserSchema>;
