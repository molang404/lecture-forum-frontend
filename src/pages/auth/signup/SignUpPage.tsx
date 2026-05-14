import { useForm } from "react-hook-form";
import { type SignUpInputType, signUpSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Gender } from "../../../types/user.type.ts";
import Button from "../../../components/common/Button.tsx";
import { useNavigate } from "react-router";

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

            // submitData를 백앤드에게 전송 => fetch를 해준다 => 비동기 함수 => async-await => try-catch
            // fetch(주소, 옵션); => 주소는 필수값, 옵션은 선택값
            // 옵션 객체 { method, header, body }
            const response = await fetch("http://localhost:8000/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitData), // 객체를 그대로 보낼 수 없고, JSON.stringify를 통해 JSON 형식의 string으로 변환
            });

            // fetch는 전송하고 응답만 받으면 성공, response에서 "개발자 논리에 맞는 성공"인지 판별해야 함
            // response도 http 메세지 내용에 기록되기 때문에 string을 JSON으로 파싱해야 함
            const result = await response.json();

            // response.ok 프로퍼티 안에 상대방이 response 상태 코드가 200번대라면 true, 아니라면 false
            // throw 키워드는 예외를 발생시켜 catch로 내가 인위적으로 보내는 것
            if (!result.ok) {
                throw new Error(result.message || "회원가입 중 오류가 발생했습니다.");
            }

            // 백엔드에게 전송해서 성공
            alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
            navigate("/auth/signin");
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error.message;

                if (errorMessage === "이미 사용 중인 아이디입니다.") {
                    setError("username", { message: errorMessage });
                } else if (errorMessage === "이미 가입된 이메일입니다.") {
                    setError("email", { message: errorMessage });
                } else if (errorMessage === "이미 사용 중인 닉네임입니다.") {
                    setError("nickname", { message: errorMessage });
                } else {
                    setError("root", { message: errorMessage });
                }
            }

            console.log(error);
            // 백앤드에게 전송해서 실패
            setError("root", { message: "회원가입에 실패했습니다. 다시 시도해주세요."});
        }
    };

    return (
        <AuthContainer>
            <FormCard onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <SubTitle>토론대난투에 오신 것을 환영합니다!</SubTitle>

                <FormBox>
                    <InputGroup>
                        <Label htmlFor={"username"}>아이디</Label>
                        <Input
                            {...register("username")}
                            $hasError={!!errors.username} // !를 붙인다는건, 어떠한 값이든 있으면 false 없으면 true, 반대값으로 boolean 형변환
                            // !!를 붙인다는건, 어떠한 값이든 있으면 true 없으면 false, boolean 형변환
                            id={"username"}
                            placeholder={"4자 이상 필요"}
                        />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"password"}>비밀번호</Label>
                        <Input
                            {...register("password")}
                            $hasError={!!errors.password}
                            id={"password"}
                            placeholder={"6자 이상 필요"}
                            type={"password"}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"passwordConfirm"}>비밀번호 확인</Label>
                        <Input
                            {...register("passwordConfirm")}
                            $hasError={!!errors.passwordConfirm}
                            id={"passwordConfirm"}
                            placeholder={"비밀번호를 한 번 더 입력해주세요"}
                            type={"password"}
                        />
                        {errors.passwordConfirm && (
                            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"name"}>이름</Label>
                        <Input {...register("name")} $hasError={!!errors.name} id={"username"} />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"nickname"}>닉네임</Label>
                        <Input
                            {...register("nickname")}
                            $hasError={!!errors.nickname}
                            id={"username"}
                            placeholder={"닉네임을 2자 이상 입력해주세요"}
                        />
                        {errors.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"email"}>이메일</Label>
                        <Input
                            {...register("email")}
                            $hasError={!!errors.email}
                            id={"email"}
                            type={"email"}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"phoneNumber"}>전화번호</Label>
                        <Input
                            {...register("phoneNumber")}
                            $hasError={!!errors.phoneNumber}
                            id={"phoneNumber"}
                            type={"tel"}
                        />
                        {errors.phoneNumber && (
                            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"birthdate"}>생년월일</Label>
                        {/* type="date"를 통해 입력을 받더라도, 전송하는 내용은 "xxxx-xx-xx" 형태의 string이 전송됨 */}
                        <Input
                            {...register("birthdate")}
                            $hasError={!!errors.birthdate}
                            id={"birthdate"}
                            type={"date"}
                        />
                        {errors.birthdate && (
                            <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
                        )}
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor={"gender"}>성별</Label>
                        <Select {...register("gender")} $hasError={!!errors.gender} id={"gender"}>
                            <option value={""}>성별을 선택해주세요</option>
                            <option value={Gender.MALE}>남성</option>
                            <option value={Gender.FEMALE}>여성</option>
                        </Select>
                        {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}
                    </InputGroup>
                </FormBox>

                <Button
                    color={"primary"}
                    variant={"contained"}
                    fullWidth={true}
                    disabled={isSubmitting}
                    type={"submit"}>
                    회원가입
                </Button>
            </FormCard>
        </AuthContainer>
    );
}

export default SignUpPage;

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormCard = styled.form`
    width: 100%;
    max-width: 480px;
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 16px;
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 40px 20px;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 8px;
    text-align: center;
`;

const SubTitle = styled.h6`
    font-size: 15px;
    color: ${props => props.theme.colors.text.disabled};
    text-align: center;
    margin-bottom: 32px;
`;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
`;

const Input = styled.input<{ $hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid
        ${props => (props.$hasError ? props.theme.colors.error : props.theme.colors.divider)};
    border-radius: 8px;
    font-size: 15px;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &::placeholder {
        color: ${props => props.theme.colors.text.disabled};
    }

    &:focus {
        border-color: ${props =>
            props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
`;

const Select = styled.select<{ $hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    background-color: ${props => props.theme.colors.background.default};
    border: 1px solid
        ${props => (props.$hasError ? props.theme.colors.error : props.theme.colors.divider)};
    border-radius: 8px;
    font-size: 15px;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &::placeholder {
        color: ${props => props.theme.colors.text.disabled};
    }

    &:focus {
        border-color: ${props =>
            props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
`;

const ErrorMessage = styled.span`
    font-size: 13px;
    color: ${props => props.theme.colors.error};
    font-weight: 500;
`;
