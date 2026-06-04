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

export const ReplyList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ReplyItem = styled.div`
    padding: 24px 0;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    
    &:last-child {
        border-bottom: none;
    }
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 40px 0;
    color: ${props => props.theme.colors.divider};
    font-size: 15px;
`;

export const ReplyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .author-info {
        display: flex;
        align-items: center;
        gap: 12px;

        strong {
            font-size: 15px;
        }

        .date {
            font-size: 13px;
            color: ${props => props.theme.colors.text.disabled};
        }
    }

    .delete-btn {
        background: ${props => props.theme.colors.error};
        border-radius: 4px;
        border: none;
        color: #ffffff;
        font-size: 13px;
        cursor: pointer;
        padding: 4px 8px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export const ReplyContent = styled.p`
    font-size: 15px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;
`;
