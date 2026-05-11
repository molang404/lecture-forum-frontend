import styled from "styled-components";
import type { ReactNode } from "react";

export type ButtonColorType = "primary" | "secondary" | "success" | "error" |  "warning" | "info";

const StyledButton = styled.button<{ $color: ButtonColorType }>`
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    background-color: ${props => props.theme.colors[props.$color]};
    padding: 8px 16px;
    border-radius: 6px;
    transition: all 0.5s;

    &:hover {
        filter: brightness(0.8);
    }
`;

// Button 컴포넌트
type Props = {
    children: ReactNode;
    color: ButtonColorType;
}

function Button({ children, color }: Props) {
    return <StyledButton $color={color}>{children}</StyledButton>
}

export default Button;