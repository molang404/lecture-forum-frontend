// PropsWithChildren 타입은 React 기본 제공 타입
// 자식 컴포넌트를 갖는 형태를 너무도 많이 쓰기 때문에 기본으로 제공 중
// type Props = {
//     width: string;
//     children: ReactNode;
// }
//
// 해당 타입을 확장해서 사용하는 방법은 interface일 경우 extends
// interface Props extends PropsWithChildren {
//     width: string;
// }
//
// type일 경우 & 연산자 사용
// type Props = PropsWithChildren & { width: string };

import { type PropsWithChildren, useEffect, useState } from "react";
import { useAuthStore } from "../../stores/auth/authStore.ts";
import userApi from "../../api/user/userApi.ts";

function AuthProvider({ children }: PropsWithChildren) {
    const { isLoggedIn, token, logout } = useAuthStore();
    const [isInitialized, setIsInitialized] = useState(true);

    useEffect(() => {
        const checkAuthValidity = async () => {
            if (isLoggedIn && token) {
                try {
                    // 백엔드에게 내가 갖고 있는 토큰이 정상 토큰인지 확인 요청 해야함
                    const result = await userApi.getMe();
                    useAuthStore.setState({ user: result });
                } catch (error) {
                    console.log(error);
                    // catch절이 실행된다는 이야기는, 백엔드에서 검증에 실패했다는 이야기
                    logout();
                    // 로그인이 안된 사용자라면, 로그아웃을 할거라면, 메인화면으로 보내야 되지 않나?
                    // 로그인이 풀렸으면, 풀렸다는 걸 알려주고 로구인 페이지로 보내야겠다
                    // alert("로그인 세션이 만료되었거나 유효하지 않습니다. 다시 로그인 해주세요");
                    // navigate("/auth/login");

                    // 만약 그러한 덧붙이는 생각을 안한다면
                    // 어차피 회원 전용 페이지는 GetRouter가 loader의해 끊을 것이므로
                    // 덧붙이는 내용이 없어도 무방함
                }
            }

            setIsInitialized(false);
        };

        checkAuthValidity().then(() => {});
    }, [isLoggedIn, logout, token]);

    if (isInitialized) {
        return null;
    }

    return <>{children}</>;
}

export default AuthProvider;
