import styled from "styled-components";
import MyAside from "../components/layout/my/MyAside.tsx";
import {Outlet} from "react-router";

function MyLayout() {
    return (
        <MyLayoutContainer>
            <div>
                <MyAside />
            </div>

            <ContentArea>
                <Outlet />
            </ContentArea>
        </MyLayoutContainer>
    );
}

export default MyLayout;

const MyLayoutContainer = styled.div`
    display: flex;
    min-height: calc(100dvh - 64px - 50px);
    background-color: ${props => props.theme.colors.background.default};
`;

const ContentArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 40px;
`;