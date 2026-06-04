export interface Reply {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    userId: number;
    postId: number;
    user: {
        id: number;
        nickname: string;
        email: string;
    }
}