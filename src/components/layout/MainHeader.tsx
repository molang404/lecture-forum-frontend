import styled from "styled-components";
import { Link } from "react-router";
import { IoChatbubbles, IoMoon } from "react-icons/io5";
import Button from "../common/Button";

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
`;

const NavGroup = styled.nav`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const IconButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    border-radius: 50%;
    color: ${props => props.theme.colors.text.default};
    transition: all 0.5s;
    
    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
`;

const TextButton = styled.button`
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.colors.text.default};
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.5s;
    
    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
`;

function MainHeader() {
    return (
        <HeaderContainer>
            <HeaderInner>
                <Logo to={"/"}>
                    <IoChatbubbles size={28} />
                    <span>토론대난투</span>
                </Logo>
                <NavGroup>
                    <IconButton>
                        <IoMoon size={20} />
                    </IconButton>
                    <TextButton as={Link} to={"/auth/login"}>로그인</TextButton>
                    <Button color={"primary"}>회원가입</Button>
                </NavGroup>
            </HeaderInner>
        </HeaderContainer>
    );
}

export default MainHeader;
