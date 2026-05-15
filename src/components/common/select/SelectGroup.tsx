import type { ReactNode, SelectHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import Select from "./Select.tsx";
import { ErrorMessage, Label, StyledInputGroup } from "../group/SignTagGroup.tsx";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    id?: string;
    errorMessage?: string;
    registerObj?: UseFormRegisterReturn;
    children: ReactNode;   // ReactNode 타입은 React의 화면 요소를 나타낼 수 있는 대표 타입
}

function SelectGroup({ label, id, errorMessage, registerObj, children, ...props}: Props) {
    return <StyledInputGroup>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Select id={id} $hasError={!!errorMessage} {...registerObj} {...props}>
            {children}
        </Select>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </StyledInputGroup>
}

export default SelectGroup;



