import { RouterProvider } from "react-router";
import GetRouter from "./router/GetRouter.tsx";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme.ts";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { useThemeStore } from "./stores/theme/themeStore.ts";
import AuthProvider from "./providers/auth/AuthProvider.tsx";

function App() {
    const { theme } = useThemeStore();
    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyle />
            <AuthProvider>
                <RouterProvider router={GetRouter}></RouterProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
