import type { User } from "./user.type.ts";
import type { Category } from "./category.type.ts";

export interface Post {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    title: string;
    content: string;
    views: number;
    userId: number;
    categoryId: number;
    option1Text: string | null;
    option2Text: string | null;
    // Generic Type 중 Pick 이라는 타입이 존재
    // Pick<해당 타입, 가져올 항목들>
    user: Pick<User, "id" | "nickname" | "email">;
    // vote라는 프로퍼티(항목)을
    // 글 내용에서만 있고, 글 목록에서는 없는 항목
    // 그렇기 때문에 union을 줘서 null 일 수 있음을 고지
    vote: {
        option1Count: number;
        option2Count: number;
        totalCount: number;
        hasVoted: boolean;
    } | null;
}

// 첫 페이지에서만 있고 글 목록+상세에는 없는 항목
export interface RecentPost extends Post {
    category: Pick<Category, "id" | "name">;
}
