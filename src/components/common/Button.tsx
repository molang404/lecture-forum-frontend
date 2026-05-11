import styled from "styled-components";
import type { ButtonHTMLAttributes, ElementType, ReactNode } from "react";

export type ButtonColorType = "primary" | "secondary" | "success" | "error" | "warning" | "info";
export type ButtonVariantType = "contained" | "text" | "icon";

const StyledButton = styled.button<{ $color: ButtonColorType; $variant: ButtonVariantType }>`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: ${props => (props.$variant === "contained" ? "#ffffff" : "inherit")};
    background-color: ${props =>
        props.$variant === "contained" ? props.theme.colors[props.$color] : "transparent"};
    padding: ${props => props.$variant === "icon" ? "8px" : "8px 12px"};
    border-radius: ${props => props.$variant === "icon" ? "50%" : "6px"};
    transition: all 0.5s;

    &:hover {
        filter: brightness(0.8);
        background-color: ${props =>
            props.$variant === "contained" ? undefined : props.theme.colors.background.default};
    }
`;

// Button 컴포넌트 Type
// Button 컴포넌트는 button 태그의 모든 속성을 허용 -> 상속 (interface)
// button 태그의 타입 : ButtonHTMLAttributes<HTMLButtonElements>

// 즉, Button 컴포넌트는 button의 확장판
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color: ButtonColorType;
    variant: ButtonVariantType;
    as?: ElementType,
    to?: string;
}

function Button({ children, color, variant, ...props }: Props) {
    return (
        <StyledButton $color={color} $variant={variant} {...(props as any)}>
            {children}
        </StyledButton>
    );
}

export default Button;
