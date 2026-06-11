import { FiLock, FiMessageSquare, FiUser, FiUserX } from "react-icons/fi";
import styled from "styled-components";
import { Link, useLocation } from "react-router";

const myNavList = [
    {
        path: "/my",
        label: "회원정보변경",
        icon: <FiUser size={18} />,
    },
    {
        path: "/my/password",
        label: "비밀번호변경",
        icon: <FiLock size={18} />,
    },
    {
        path: "/my/inquiry",
        label: "1:1 문의",
        icon: <FiMessageSquare size={18} />,
    },
    {
        path: "/my/withdraw",
        label: "회원탈퇴",
        icon: <FiUserX size={18} />,
    },
];

function MyAside() {
    const location = useLocation();
    return (
        <MySidebar>
            <SidebarHeader to={"/my"}>마이페이지</SidebarHeader>
            <SidebarMenu>
                {myNavList.map((item, index) => {
                    const isActive = item.path === location.pathname;

                    return (
                        <MenuItem to={item.path} key={index} $isActive={isActive}>
                            {item.icon}
                            {item.label}
                        </MenuItem>
                    );
                })}
            </SidebarMenu>
        </MySidebar>
    );
}

export default MyAside;

const MySidebar = styled.aside`
    width: 240px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    flex-direction: column;
`;

const SidebarHeader = styled(Link)`
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

const SidebarMenu = styled.nav`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    gap: 4px;
    flex: 1;
`;

const MenuItem = styled(Link)<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    font-size: 15px;
    font-weight: 500;
    color: ${props =>
    props.$isActive ? props.theme.colors.primary : props.theme.colors.text.default};
    background-color: ${props =>
    props.$isActive ? `${props.theme.colors.primary}15` : "transparent"};
    border-left: 4px solid
        ${props => (props.$isActive ? props.theme.colors.primary : "transparent")};
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.primary};
    }
`;