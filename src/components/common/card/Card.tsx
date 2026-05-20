import type { ReactNode } from "react";
import styled from "styled-components";

type CardProps = {
    children: ReactNode;
    padding?: string;
};

// 매개변수 자리에 = 을 붙여서 기본값 (값이 들어오지 않으면 이 값을 쓰겠다)
function Card({ children, padding = "32px" }: CardProps) {
    return <StyledCard $padding={padding}>{children}</StyledCard>;
}

export default Card;

const StyledCard = styled.div<{ $padding?: string }>`
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    padding: ${props => props.$padding};
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;
