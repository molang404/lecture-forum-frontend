import styled from "styled-components";
import { Outlet } from "react-router";
import AdminAside from "../components/layout/admin/AdminAside.tsx";

function AdminLayout() {
    return (
        <AdminContainer>
            <AdminAside />
            <AdminMain>
                <AdminContentInner>
                    <Outlet />
                </AdminContentInner>
            </AdminMain>
        </AdminContainer>
    );
}

export default AdminLayout;

const AdminContainer = styled.div`
    display: flex;
    min-height: 100dvh;
    background-color: ${props => props.theme.colors.background.default};
`;

const AdminMain = styled.main`
    flex: 1;
    padding: 32px;
    overflow-y: auto;
`;

const AdminContentInner = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
`