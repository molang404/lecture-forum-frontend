import Input from "./Input.tsx";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { ErrorMessage, Label, StyledInputGroup } from "../group/Group.tsx";

// 우리가 사용한 InputGroup이 input 태그의 확장판이다
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    errorMessage?: string;
    registerObj?: UseFormRegisterReturn;
    wrap?: boolean;
}

// 원래 input을 수동 관리한다면, <input onChange={() => {}} value= {} name="username" /> 형태
// react-hook-form을 이용할 경우, <input {...register("username")} /> 로 사용 했는데
// 이것은
// register("username") 을 실행한 결과(리턴)이
// {
//    onChange: () => {}
//    value: "",
//    name: "username"
// }
// 이러한 객체였기 때문에 그것을 스프레드 문법을 통해 input 태그 안에 흩뿌린 것
//
// 그렇기 때문에 InputGroup이라는 컴포넌트는 registerObj라는 이름을 register()를 실행한 결과 값을
// 받아서 Input 내부에 흩뿌려주도록 함
// register()를 실행한 결과 객체의 타입은 UseFormRegisterReturn

function InputGroup({ label, id, errorMessage, registerObj, wrap, ...props}: Props) {
    return (
        <StyledInputGroup $wrap={wrap}>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Input id={id} $hasError={!!errorMessage} {...registerObj} {...props}/>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </StyledInputGroup>
    );
}

export default InputGroup;
