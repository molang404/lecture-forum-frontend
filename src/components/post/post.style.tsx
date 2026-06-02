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

export const Battleground = styled.div`
    margin-top: 60px;
    padding: 32px;
    background-color: ${props => props.theme.colors.background.default};
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.divider};
`;

export const BattleTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 32px;
`;

export const VoteSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    position: relative;
`;

export const VoteCard = styled.button<{ $color: string }>`
    background-color: ${({ theme }) => theme.colors.background.paper};
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: ${({ theme }) => theme.colors.text.default};

    svg {
        color: ${({ $color }) => $color};
    }

    h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        word-break: keep-all;
    }

    p {
        margin: 0;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.text.disabled};
    }

    &:hover:not(:disabled) {
        border-color: ${({ $color }) => $color};
        transform: translateY(-4px);
        box-shadow: 0 10px 20px ${({ $color }) => `${$color}20`};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const ResultSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ResultBarWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    border-radius: 30px;
    overflow: hidden;
    background-color: ${props => props.theme.colors.divider};
`;

export const ResultBar = styled.div<{ $color: string; $width: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: ${props => props.$width};
    background-color: ${props => props.$color};
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    transition: width 1s;
    white-space: nowrap; // 글자가 줄바꿈이 안되도록
    overflow: hidden; // 칸이 작아도 부모 요소 크기에 맞춰서 가려지도록

    .label {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .percent {
        font-size: 18px;
    }
`;

export const ResultText = styled.p`
    text-align: center;
    font-size: 14px;
    color: ${props => props.theme.colors.secondary};
    margin-top: 8px;
`;

export const RevoteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 16px auto 0 auto;
    padding: 8px 16px;
    font-size: 15px;
    font-weight: 600;
    color: ${props => props.theme.colors.secondary};
    background-color: transparent;
    border: 1px solid ${props => props.theme.colors.divider};
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: ${props => props.theme.colors.text.default};
        border-color: ${props => props.theme.colors.secondary};
        background-color: ${props => props.theme.colors.background.default};
    }
`;

export const LoadingText= styled.div`
    text-align: center;
    padding: 100px 0;
    color: ${props => props.theme.colors.text.disabled};
`;