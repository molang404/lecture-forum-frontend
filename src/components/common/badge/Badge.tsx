import type { ReactNode } from "react";
import styled, { css } from "styled-components";

type BadgeColor = "primary" | "secondary" | "error" | "success" | "warning" | "info" | "default";

type BadgeProps = {
    children: ReactNode;
    color?: BadgeColor;
};

function Badge({ children, color = "default" }: BadgeProps) {
    return <StyledBadge $color={color}>{children}</StyledBadge>;
}

export default Badge;

const StyledBadge = styled.span<{
    $color: BadgeColor;
}>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;

    ${({ theme, $color }) => {
        switch ($color) {
            case "primary":
                return css`
                    background-color: ${theme.colors.primary}20;
                    color: ${theme.colors.primary};
                `;
            case "error":
                return css`
                    background-color: ${theme.colors.error}20;
                    color: ${theme.colors.error};
                `;
            case "success":
                return css`
                    background-color: ${theme.colors.success}20;
                    color: ${theme.colors.success};
                `;
            case "warning":
                return css`
                    background-color: ${theme.colors.warning}20;
                    color: ${theme.colors.warning};
                `;
            case "info":
                return css`
                    background-color: ${theme.colors.info}20;
                    color: ${theme.colors.info};
                `;
            case "secondary":
                return css`
                    background-color: ${theme.colors.secondary}20;
                    color: ${theme.colors.secondary};
                `;
            case "default":
            default:
                return css`
                    background-color: ${theme.colors.divider}20;
                    color: ${theme.colors.text.disabled};
                `;
        }
    }}
`;
