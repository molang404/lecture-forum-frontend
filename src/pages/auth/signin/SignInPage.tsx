import {useForm} from "react-hook-form";
import { type SignInInputType, signInSchema } from "../../../schemas/auth/signInSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../../components/common/button/Button.tsx";
import axiosInstance from "../../../api/axiosInstance.ts";
import {useNavigate} from "react-router";
import * as axios from "axios";
import {
    AuthContainer,
    AuthFormBox,
    AuthFormCard,
    AuthRootErrorMessage,
    AuthSubTitle,
    AuthTitle,
} from "../../../components/auth/auth.style.tsx";
import InputGroup from "../../../components/common/input/InputGroup.tsx";

function SignInPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<SignInInputType>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: SignInInputType) => {
        try {
            // SignUp에서는 백엔드가 뭐라고 대답하든 "성공"이면 신경 안써도 되는데
            // SignIn에서는 백엔드가 "성공" 대답하면서 신분증(token)을 응답함;
            const response = await axiosInstance.post("/user/login", data);
            // axios의 응답값인 response는 response.date에 실제 백앤드가 응답한 데이터가 담김
            // user 정보와 token을 뽑아와야 함
            const { user, token } = response.data.data;

            // 신분증 발급은 login이라는 행위를 할 때에만 발급이 됨
            // 그렇기 떄문에 이 token은 어딘가(ContextAPI, localStorage)에 저장해서
            // 사용자가 백엔드에 요청을 할 때마다 꺼내서 요청을 해야 함
            localStorage.setItem("accessToken", token);

            alert("로그인에 성공했습니다!");


            navigate("/");
        } catch (error) {
            let errorMessage = "로그인 중 오류가 발생했습니다.";

            if (axios.isAxiosError(error)) {
                // catch에 모여지는 error는
                // axios에서 발생한 에러일 수도 있고, 아닐 수도 있는데 (통신 자체 실패)
                // axios에서 발생한 에러이더라도
                // 백앤드가 정상적으로 뱉어준 2xx가 아닌 에러들은 백엔드가 { message: "~~~" } 형태로 응답함
                // 그렇기 때문에 { message: "~~~" } 가 있을 때에는 그 내용을 errorMessage에 저장하고
                // 아니라면 기본 메세지("로그인 중 오류가 발생했습니다.")를 유지하겠다는 뜻
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setError("root", { message: errorMessage });
        }
    }
    
    return (
        <AuthContainer>
            <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
                <AuthTitle>로그인</AuthTitle>
                <AuthSubTitle>다시 오신 것을 환영합니다!</AuthSubTitle>

                <AuthFormBox>
                    <InputGroup
                        label={"아이디"}
                        id={"username"}
                        registerObj={register("username")}
                        errorMessage={errors.username?.message}
                        placeholder={"아이디를 입력해주세요"}
                    />
                    <InputGroup
                        label={"비밀번호"}
                        id={"password"}
                        registerObj={register("password")}
                        errorMessage={errors.password?.message}
                        placeholder={"비밀번호를 입력해주세요"}
                    />
                </AuthFormBox>

                {errors.root && <AuthRootErrorMessage>{errors.root.message}</AuthRootErrorMessage>}

                <Button
                    color={"primary"}
                    variant={"contained"}
                    fullWidth={true}
                    disabled={isSubmitting}
                    type={"submit"}>
                    로그인
                </Button>
            </AuthFormCard>
        </AuthContainer>
    );
}

export default SignInPage;
