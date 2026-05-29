import styled from "styled-components";

export const PostContainer = styled.div`
    width: 100%;
`;

export const PostPageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 24px;
`;

// styled-components는 CSS 방식의 스타일링을 제공하는 것이 아니라
// SCSS (또는 SASS) 방식의 스타일링을 제공하기 때문에
// 트리를 타고 작성하는 것이 가능함
export const PostTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 20px;
    
    small {
        font-size: 14px;
        font-weight: 400;
        color: ${props => props.theme.colors.secondary};
    }
`;

export const FormWrapper = styled.form`
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const FormDivider = styled.hr`
    border: none;
    border-top: 1px solid ${props => props.theme.colors.divider};
`;

export const VoteSectionTitle = styled.h3`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: -10px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    small {
        font-size: 13px;
        font-weight: 400;
        color: ${props => props.theme.colors.text.disabled};
    }
`;

export const VoteSectionDescription = styled.p`
    font-size: 14px;
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 20px;
`;

export const VoteFieldFlex = styled.div`
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    width: 100%;
`;

export const BoardWrapper = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    overflow: hidden;
`;

export const BoardTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    
    thead {
        background-color: ${props => props.theme.colors.background.default};
        border-bottom: 1px solid ${props => props.theme.colors.divider};
    }
    
    tbody tr {
        border-bottom: 1px solid ${props => props.theme.colors.divider};
        transition: all 0.2s;
        
        &:last-child {
            border-bottom: none;
        }
        
        &:hover {
            background-color: ${props => props.theme.colors.background.default};
        }
    }
`;

export const BoardTh = styled.th<{ $width?: string; }>`
    padding: 16px;
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.colors.text.disabled};
    text-align: center;
    width: ${props => props.$width || "auto"};
`;

export const BoardTd = styled.td<{ $align?: "left" | "center" | "right"}>`
    padding: 16px;
    font-size: 15px;
    text-align: ${props => props.$align || "center"};
    
    &.title-cell {
        text-align: left;
    }
`;

export const DetailWrapper = styled.div`
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 32px;
`;

export const DetailHeader = styled.div`
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    padding-bottom: 24px;
    margin-bottom: 24px;
`;

export const DetailTitle = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 16px;
`;

export const DetailInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: ${props => props.theme.colors.text.disabled};
    
    .left-info {
        display: flex;
        gap: 16px;
        align-items: center;
    }
    
    .right-info {
        display: flex;
        gap: 16px;
        align-items: center;
    }
`;

export const DetailContent = styled.div`
    font-size: 16px;
    line-height: 1.6;
    min-height: 100px;
    white-space: pre-wrap; // 줄바꿈 문자 \ n 을 실제 줄바꿈으로 처리
`;

export const LoadingText= styled.div`
    text-align: center;
    padding: 100px 0;
    color: ${props => props.theme.colors.text.disabled};
`;