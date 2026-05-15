import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeType = "light" | "dark";

type ThemeState = {
    theme: ThemeType;
    onChangeTheme: VoidFunction;
};

export const useThemeStore = create<ThemeState>()(
    // persist는 이렇게 마련한 store와 localStorage를 연결하는 미들웨어
    // persist를 사용하면 localStorage에 자동 저장/불러오기 기능이 추가됨

    // create<스토어의 타입>(persist)
    // persist(초기값, localStorage의 설정)

    // 초기값을 함수로 넣었고, (스토어의 값을 바꿀 수 있는 명령(-> set)) => ({ theme, onChangeTheme })
    persist(
        set => ({
            theme: "light",
            onChangeTheme: () =>
                set(state => ({ theme: state.theme === "light" ? "dark" : "light" })),
        }),
        {
            name: "theme-storage",
        },
    ),
);

// function sum(x, y) {
//     return () => 3 * x;
// }
//
// sum(3, 4)  => (x) => 3 * x;
// sum(3, 4)() => 9