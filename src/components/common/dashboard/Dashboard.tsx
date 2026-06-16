import styled from "styled-components";

export const DashboardWrapper = styled.div`
    margin: 20px 0;
    border-top: 2px solid ${props => props.theme.colors.divider};
`;

export const DashboardTitle = styled.h4`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 18px;
    font-weight: 600;
    margin: 26px 0 10px 0;
`;