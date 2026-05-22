import styled from "styled-components";

export const StyledInputGroup = styled.div<{ $wrap?: boolean }>`
    width: ${props => props.$wrap ? "calc((100% - 32px) / 2)" : "auto"};
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    font-size: 14px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
`;

export const ErrorMessage = styled.span`
    font-size: 13px;
    color: ${props => props.theme.colors.error};
    font-weight: 500;
`;