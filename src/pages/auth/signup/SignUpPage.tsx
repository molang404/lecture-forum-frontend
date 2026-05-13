import { useForm } from "react-hook-form";
import { type SignUpInputType, signUpSchema } from "../../../schemas/auth/signUpSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Gender } from "../../../types/user.type.ts";
import Button from "../../../components/common/Button.tsx";

function SignUpPage() {
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
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpInputType>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur", // 언제 검증할 것인지
    });

    const onSubmit = () => {};

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
    border: 1px solid ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.divider};
    border-radius: 8px;
    font-size: 15px;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;

    &::placeholder {
        color: ${props => props.theme.colors.text.disabled};
    }

    &:focus {
        border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
`;

const Select = styled.select<{ $hasError?: boolean}>`
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
