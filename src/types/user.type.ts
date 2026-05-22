// Enum 타입

// enum 키워드를 통해서 타입을 작성하는 방법이 2년 전까지는 통용되었음
// enum GenderType {
//    MALE = "MALE",
//    FEMALE = "FEMALE",
// }

export const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
}

export type GenderType = typeof Gender[keyof typeof Gender];
// typeof 키워드 : 해당 변수의 타입을 반환
// keyof 키워드 : 해당 객체의 키를 반환

export const Role = {
    USER: "USER",
    ADMIN: "ADMIN",
}

export type RoleType = typeof Role[keyof typeof Role];

export interface User {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    username: string;
    name: string;
    nickname: string;
    email: string;
    phoneNumber: string | null;
    birthday: Date | null;
    gender: GenderType;
    role: RoleType;
}