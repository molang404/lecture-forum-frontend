import styled from "styled-components";

export const AnswerBox = styled.div`
    margin-top: 40px;
    padding: 24px;
    background-color: ${props => props.theme.colors.background.default};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};

    .answer-content {
        padding-top: 16px;
    }
`;

export const AnswerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    padding-bottom: 16px;

    .admin-label {
        font-weight: 700;
        color: ${props => props.theme.colors.primary};
    }

    .answer-date {
        font-size: 14px;
        color: ${props => props.theme.colors.secondary};
    }
`;
