import type { User } from "./user.type.ts";

export interface Inquiry {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    answer?: string;
    answeredAt?: string;
    userId: number;
    user: Pick<User, "id" | "nickname" | "email">; // User 라는 타입과 관계있는 값이 들어온다

    // 이렇게 써도 되는데, 이렇게 쓰면 "User"라고 하는 거랑 별개의 객체가 됨
    // user: {
    //      id: number;
    //      nickname: string;
    //      email: string;
    // }
}
