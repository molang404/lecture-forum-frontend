// 1. 타입 지정

import type {User} from "../../types/user.type.ts";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type AuthState = {
    // 값을 저장하는 프로퍼티
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;

    // 저장된 값을 바꿀 수 있도록 외부에서 사용하게 하는 기능 프로퍼티
    login: (user: User, token: string) => void; // token과 user의 항목의 값을 바꾸고, isLoggedIn을 true로 바꾸는 일
    logout: VoidFunction;    // token과 user의 항목의 값을 비우고, isLoggedIn을 false로 바꾸는 일
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            isLoggedIn: false,
            token: null,
            user: null,
            login: (user, token) => set({ isLoggedIn: true, token, user }),
            logout: () => set({ isLoggedIn: false, token: null, user: null }),
        }),
        { name: "auth-storage" }
    )
);

// 원래 객체의 값을 바꿔준다고 했을 떄, 나머지 항목들도 값을 유지하려면 값을 적어줘야 하는데
// zustand의 set 명령어는 적어주지 않은 프로퍼티(항목)의 값은 안 적어줘도 유지함