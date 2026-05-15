import styled from "styled-components";

export const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AuthFormCard = styled.form`
    width: 100%;
    max-width: 480px;
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 16px;
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 40px 20px;
`;

export const AuthTitle = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 8px;
    text-align: center;
`;

export const AuthSubTitle = styled.h6`
    font-size: 15px;
    color: ${props => props.theme.colors.text.disabled};
    text-align: center;
    margin-bottom: 32px;
`;

export const AuthFormBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 50px;
`;

export const AuthRootErrorMessage = styled.p`
    font-size: 14px;
    text-align: center;
    color: ${props => props.theme.colors.error};
    font-weight: 500;
    margin-bottom: 50px;
`;