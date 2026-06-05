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

export const Role = {
    ADMIN: "ADMIN",
    USER: "USER",
}

export type RoleType = typeof Role[keyof typeof Role];