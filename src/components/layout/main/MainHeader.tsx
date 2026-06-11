import styled from "styled-components";
import { Link } from "react-router";
import { IoChatbubbles, IoMoon, IoSunny } from "react-icons/io5";
import Button from "../../common/button/Button.tsx";
import { useThemeStore } from "../../../stores/theme/themeStore.ts";
import { useAuthStore } from "../../../stores/auth/authStore.ts";
import { FiSettings, FiUser } from "react-icons/fi";
import { Role } from "../../../types/user.type.ts";
import { useEffect, useState } from "react";
import type { Category } from "../../../types/category.type.ts";
import categoryApi from "../../../api/user/categoryApi.ts";

const HeaderContainer = styled.header`
    height: 64px;
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: ${props => props.theme.colors.background.paper};
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
`;

const HeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    height: 64px;
`;

const Logo = styled(Link)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 24px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-right: 60px;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 40px;
    flex: 1;
`;

const NavItem = styled(Link)`
    font-size: 16px;
    font-weight: 600;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.3s;
    
    &:hover {
        color: ${props => props.theme.colors.primary};
    }
`;

const NavGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

function MainHeader() {
    const { theme, onChangeTheme } = useThemeStore();
    const { user, isLoggedIn, logout } = useAuthStore();

    const [list, setList] = useState<Category[]>([]);

    useEffect(() => {
        const loadList = async () => {
            try {
                const data = await categoryApi.fetchCategoryList();
                setList(data);
            } catch (error) {
                console.log(error);
            }
        }

        loadList().then(() => {});
    }, []);

    return (
        <HeaderContainer>
            <HeaderInner>
                <Logo to={"/"}>
                    <IoChatbubbles size={28} />
                    <span>토론대난투</span>
                </Logo>

                <Nav>
                    {list.map(item => (
                        <NavItem key={item.id} to={`/category/${item.id}`}>
                            {item.name}
                        </NavItem>
                    ))}
                </Nav>

                <NavGroup>
                    <Button color={"primary"} variant={"text"} as={Link} to={"/notice"}>
                        공지사항
                    </Button>
                    
                    <Button color={"primary"} variant={"icon"} onClick={onChangeTheme}>
                        {theme === "light" ? <IoSunny size={20} /> : <IoMoon size={20} />}
                    </Button>
                    { isLoggedIn ? (
                        <>
                            <Button color={"primary"} variant={"icon"} as={Link} to={"/my"}>
                                <FiUser size={20} />
                            </Button>
                            {user?.role === Role.ADMIN && (
                                <Button color={"primary"} variant={"contained"} as={Link} to={"/admin"}>
                                    <FiSettings size={20} />
                                </Button>
                            )}
                            <Button color={"error"} variant={"contained"} onClick={logout}>
                                로그아웃
                            </Button>
                        </>
                    ) : (<>
                        <Button color={"primary"} variant={"text"} as={Link} to={"/auth/signin"}>
                            로그인
                        </Button>
                        <Button color={"primary"} variant={"contained"} as={Link} to={"/auth/signup"}>
                            회원가입
                        </Button>
                    </>)}
                </NavGroup>
            </HeaderInner>
        </HeaderContainer>
    );
}

export default MainHeader;
