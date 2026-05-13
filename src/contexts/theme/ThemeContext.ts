import {createContext} from "react";

export type ThemeType = "light" | "dark";

// useState를 통해 theme를 만들 떄
// theme라고 state와, onChangeTheme하는 기능
export type ThemeContextType = {
    theme: ThemeType;
    // VoidFunction 타입은 () => void 형태를 나타내는 기본 타입.
    // 결국 이 이야기는, onChangeTheme 항목(프로퍼티)은 함수가 들어갈 수 있는데,
    // 그 함수는 매개변수가 없고, 리턴도 없는 함수가 들어간다는 뜻
    onChangeTheme: VoidFunction;
}

// 여기까지는 ContextAPI를 선언한 게 아니라, 선언할 때 사용할 타입을 지정
// 이렇게 만들어진 ThemeContext는 ThemeContextType의 모양(타입)을 저장
export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    onChangeTheme: () => {},
});

// 사실 이렇게 마련한 ThemeContext의 초기값은 쓸모가 없음
// 그 저장소의 Type만 맞춰서 값을 집어넣은 것(dummy)

// ThemeContextType에 쓴 VoidFunction ( () => void ) 는 타입을 쓴 것
// ThemeContext에 쓴 () => {} 는 실제 값(함수)를 쓴 것
