import styled from "styled-components";
import { Link, useLocation } from "react-router";
import { FiBell, FiGrid, FiHome, FiMessageSquare, FiUser } from "react-icons/fi";

const adminNavList = [
    {
        path: "/admin/category",
        label: "카테고리 관리",
        icon: <FiGrid size={18} />,
    },
    {
        path: "/admin/user",
        label: "유저 관리",
        icon: <FiUser size={18} />,
    },
    {
        path: "/admin/notice",
        label: "공지사항 관리",
        icon: <FiBell size={18} />,
    },
    {
        path: "/admin/inquiry",
        label: "1:1 문의 관리",
        icon: <FiMessageSquare size={18} />,
    },
    {
        path: "/",
        label: "서비스로 돌아가기",
        icon: <FiHome size={18} />,
    },
];

function AdminAside() {
    // 사용자가 현재 위치한 경로를 가져오기 위해 useLocation()을 준비하면,
    // lacation.pathname 에 저장되어 있음
    const location = useLocation();

    return (
        <AdminSideBar>
            <SideBarHeader to={"/admin"}>관리자 센터</SideBarHeader>
            <SideBarMenu>
                {adminNavList.map((item, index) => {
                    // 지금 현재 사용자가 있는 위치에 따라 MenuItem의 색상을 다르게 해줄 것임
                    const isActive = item.path === location.pathname;

                    return (
                        <MenuItem to={item.path} key={index} $isActive={isActive}>
                            {item.icon}
                            {item.label}
                        </MenuItem>
                    );
                })}
            </SideBarMenu>
        </AdminSideBar>
    );
}

export default AdminAside;

const AdminSideBar = styled.aside`
    width: 260px;
    background-color: ${props => props.theme.colors.background.paper};
    border-right: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    flex-direction: column;
`;

const SideBarHeader = styled(Link)`
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    font-size: 20px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

const SideBarMenu = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 16px 0;
    gap: 8px;
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
    // #3B82F615
    border-left: 4px solid
        ${props => (props.$isActive ? props.theme.colors.primary : "transparent")};
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
        color: ${props => props.theme.colors.primary};
    }
`;
