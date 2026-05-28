import { ErrorMessage, Label, StyledInputGroup } from "../group/Group.tsx";
import Textarea from "./Textarea.tsx";
import type { TextareaHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    id?: string;
    errorMessage?: string;
    registerObj?: UseFormRegisterReturn;
}

function TextareaGroup({ label, id, errorMessage, registerObj, ...props }: Props) {
    return (
        <StyledInputGroup>
            {label && <Label htmlFor={id}>{label}</Label>}
            <Textarea id={id} $hasError={!!errorMessage} {...registerObj} {...props} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </StyledInputGroup>
    );
}

export default TextareaGroup;