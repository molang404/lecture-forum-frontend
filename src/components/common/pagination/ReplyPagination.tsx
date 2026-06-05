import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = {
    currentPage: number; // 지금 현재 페이지 번호
    totalPage: number; // 총 페이지 매수
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
};

function ReplyPagination({ currentPage, totalPage, onPageChange, maxVisiblePages = 5 }: Props) {
    if (totalPage <= 1) {
        return null;
    }

    // 현재 페이지가 속한 블록 구함
    const currentBlock = Math.ceil(currentPage / maxVisiblePages);
    // 13번 페이지를 보고 있는데 maxVisiblePage 5개라고 했다면
    // 13 / 5 = 올림하면 3
    // 블록 구성은 1 ~ 5, 6 ~ 10, 11 ~ 15 로 되므로 3번 블록에 속한다가 됨
    const startPage = (currentBlock - 1) * maxVisiblePages + 1; // 11번 페이지가 시작이구나
    // Math.min() 매개변수에 제공되는 숫자들 중에 작은 값을 구하는 메서드
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPage); // 15번 페이지가 되는구나

    const pageNumber = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumber.push(i); // [1, 2, 3, 4, 5]
    }

    return (
        <PaginationContainer>
            <ArrowButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                <FiChevronLeft size={18} />
            </ArrowButton>
            {pageNumber.map(item => (
                <PageNumButton
                    key={item}
                    $isActive={item === currentPage}
                    onClick={() => onPageChange(item)}>
                    {item}
                </PageNumButton>
            ))}
            <ArrowButton
                disabled={currentPage === totalPage}
                onClick={() => onPageChange(currentPage + 1)}>
                <FiChevronRight size={18} />
            </ArrowButton>
        </PaginationContainer>
    );
}

export default ReplyPagination;

const PaginationContainer = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 24px;
`;

const PageNumButton = styled.button<{ $isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 28px;
    height: 28px;
    padding: 0 6px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid
        ${props => (props.$isActive ? props.theme.colors.primary : props.theme.colors.divider)};
    background-color: ${props =>
        props.$isActive ? props.theme.colors.primary : props.theme.colors.background.paper};
    color: ${props => (props.$isActive ? "#FFFFFF" : props.theme.colors.text.default)};
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        ${props =>
            !props.$isActive &&
            `
        background-color: ${props.theme.colors.background.default};
        color: ${props.theme.colors.primary};
        `}
    }
`;

const ArrowButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 28px;
    height: 28px;
    padding: 0 6px;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid ${props => props.theme.colors.divider};
    background-color: ${props => props.theme.colors.background.paper};
    color: ${props => props.theme.colors.text.default};
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.primary};
    }

    &:disabled {
        color: ${props => props.theme.colors.text.disabled};
        background-color: ${props => props.theme.colors.background.paper};
        border-color: ${props => props.theme.colors.divider};
        cursor: not-allowed;
        opacity: 0.6;
    }
`;
