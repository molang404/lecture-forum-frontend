import { Outlet } from "react-router";
import styled from "styled-components";
import MainHeader from "../components/layout/main/MainHeader.tsx";
import MainFooter from "../components/layout/main/MainFooter.tsx";

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
`;

const MainContainer = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    // 모바일 고려
    padding: 40px 20px;
`;

function MainLayout() {
    return (
        <LayoutWrapper>
            <MainHeader />
            <MainContainer>
                <Outlet />
            </MainContainer>
            <MainFooter />
        </LayoutWrapper>
    );
}

export default MainLayout;
