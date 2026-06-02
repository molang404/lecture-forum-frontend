import styled from "styled-components";

export const ReplyContainer = styled.div`
    margin-top: 40px;
    padding-top: 32px;
    border-top: 1px solid ${props => props.theme.colors.divider};
`;

export const ReplyTitle = styled.h3`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
    
    svg {
        color: ${props => props.theme.colors.secondary};
    }
    
    .count {
        color: ${props => props.theme.colors.primary};
        font-size: 18px;
        margin-left: 4px;
    }
`;

export const ReplyForm = styled.form`
    display: flex;
    gap: 12px;
    margin-bottom: 40px;
`;