import { useForm } from "react-hook-form";
import { type SignUpInputType, signUpSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender } from "../../../types/user.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { useNavigate } from "react-router";
import axiosInstance from "../../../api/axiosInstance.ts";
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
import SelectGroup from "../../../components/common/select/SelectGroup.tsx";

function SignUpPage() {
    const navigate = useNavigate();
    // 회원가입 화면

    // input들을 react-hook-form으로 관리
    // 사용자가 입력한 값들을 백앤드로 보내기 전, 검증 절차 필요  => zod
    // 화면 작성

    // react-hook-form만 이용한다면, 사용자가 입력하는 값에 대한 검증 내용을
    // input {…register(input이름, { 옵션 })
    //형태로 옵션 자리에 기재해줌

    //근데 react-hook-form + zod 를 이용한다면 이미 검증 내용이 zod에 있음
    //그렇다면, react-hook-form에다가 zod의 검증 내용을 알려주면 됨

    //이렇게 zod의 내용을 react-hook-form에 연결하기 위한 라이브러리 설치
    //pnpm install @hookform/resolvers

    // isSubmitting: handleSubmit을 통해 "전송" 중이라면 true, 아니라면 false 값
    // setError : 에러 발생 시, 해당 항목에 대한 에러 메세지를 설정하는 메서드
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpInputType>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur", // 언제 검증할 것인지
    });

    // errors
    // 처음에는 errors = {} 형태로 존재함
    // 그러다가 각 항목에 에러가 발생이 되면 (검증에 실패하면) 그 안에 key가 추가됨
    // username의 검증에 실패하면 errors = { username: { message: "에러내용" } }; 형태가 됨
    // errors는 각 항목에 대한 에러만 관리하는게 아니라 대표 errors 항목인 "root"라는 항목도 있음

    const onSubmit = async (data: SignUpInputType) => {
        try {
            // 전송에 대한 내용을 기재하면 되는데, 그대로 데이터를 전달할 것인가?
            // 프론트앤드에서 필요한 passwordConfirm 항목이 추가됨
            const { passwordConfirm, ...submitData } = data;

            // fetch()로 통신을 하면, 백엔드가 전달해주는 response가 존재하기만 하면 성공으로 판단하지만
            // axios로 통신을 하면, 백엔드가 2xx번대 성공 코드를 전달해줘야만 성공으로 판단
            // 이외의 에러는 catch로 처리됨
            await axiosInstance.post("/user/create", submitData);

            // 성공을 했었을 때 백엔드가 전달하는 내용은 response.data에 객체 상태로 존재함 (JSON 파싱할 필요 없음)

            // 백엔드에게 전송해서 성공
            alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
            navigate("/auth/signin");
        } catch (error) {
            // 기본 에러 메세지를 미리 넣어서 errorMessage 마련
            let errorMessage = "회원가입 중 오류가 발생했습니다.";

            // 지금 catch된 error가 axios의 에러인지 판별
            if (axios.isAxiosError(error)) {
                // = { message: "~~~" }
                // axios에서 발생된 에러라면, 백앤드에서 제공을 한 내용이 error.response.data에 존재
                // 그 백앤드에서 전달해준 내용을 errorMessage에 저장
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                // axios에서 발생한 에러가 아닌, 자바스크립트 표준 에러 객체라면
                // error.message에 담긴 에러 내용을 errorMessage에 저장
                errorMessage = error.message;
            }

            setError("root", { message: errorMessage });
        }
    };

    return (
        <AuthContainer>
            <AuthFormCard onSubmit={handleSubmit(onSubmit)}>
                <AuthTitle>회원가입</AuthTitle>
                <AuthSubTitle>토론대난투에 오신 것을 환영합니다!</AuthSubTitle>

                <AuthFormBox>
                    <InputGroup
                        label={"아이디"}
                        id={"username"}
                        errorMessage={errors.username?.message}
                        registerObj={register("username")}
                        placeholder={"4자 이상 필요"}
                    />
                    <InputGroup
                        label={"비밀번호"}
                        id={"password"}
                        errorMessage={errors.password?.message}
                        registerObj={register("password")}
                        placeholder={"6자 이상 필요"}
                        type={"password"}
                    />

                    <InputGroup
                        label={"비밀번호 확인"}
                        id={"passwordConfirm"}
                        errorMessage={errors.passwordConfirm?.message}
                        registerObj={register("passwordConfirm")}
                        placeholder={"비밀번호를 한 번 더 입력해주세요"}
                        type={"password"}
                    />

                    <InputGroup
                        label={"이름"}
                        id={"name"}
                        errorMessage={errors.name?.message}
                        registerObj={register("name")}
                    />

                    <InputGroup
                        label={"닉네임"}
                        id={"nickname"}
                        errorMessage={errors.nickname?.message}
                        registerObj={register("nickname")}
                        placeholder={"닉네임을 2자 이상 입력해주세요"}
                    />

                    <InputGroup
                        label={"이메일"}
                        id={"email"}
                        errorMessage={errors.email?.message}
                        registerObj={register("email")}
                        type={"email"}
                    />

                    <InputGroup
                        label={"전화번호"}
                        id={"phoneNumber"}
                        errorMessage={errors.phoneNumber?.message}
                        registerObj={register("phoneNumber")}
                        type={"tel"}
                    />

                    <InputGroup
                        label={"생년월일"}
                        id={"birthdate"}
                        errorMessage={errors.birthdate?.message}
                        registerObj={register("birthdate")}
                        type={"date"}
                    />

                    <SelectGroup
                        label={"성별"}
                        id={"gender"}
                        errorMessage={errors.gender?.message}
                        registerObj={register("gender")}>
                        <option value={""}>성별을 선택해주세요</option>
                        <option value={Gender.MALE}>남자</option>
                        <option value={Gender.FEMALE}>여자</option>
                    </SelectGroup>
                </AuthFormBox>

                {errors.root && <AuthRootErrorMessage>{errors.root.message}</AuthRootErrorMessage>}

                <Button
                    color={"primary"}
                    variant={"contained"}
                    fullWidth={true}
                    disabled={isSubmitting}
                    type={"submit"}>
                    회원가입
                </Button>
            </AuthFormCard>
        </AuthContainer>
    );
}

export default SignUpPage;
