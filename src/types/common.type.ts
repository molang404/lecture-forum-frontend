export type PaginationResponseType<T> = {
    page: number;
    size: number;
    total: number;
    list: T[];
}

// Generic Type
// 내가 타입을 쓸 때, 모양이 변하는 타입
// 타입에 타입을 집어넣어서 모양을 변화시킴

