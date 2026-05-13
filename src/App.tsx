import { RouterProvider } from "react-router";
import GetRouter from "./router/GetRouter.tsx";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme.ts";
import { GlobalStyle } from "./styles/GlobalStyle.ts";
import { useEffect, useState } from "react";
import  { ThemeContext, type ThemeType } from "./contexts/theme/ThemeContext.ts";

function App() {
    const [ theme, setTheme ] = useState<ThemeType>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" ? "dark" : "light";
    });

    const onChangeTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, onChangeTheme }}>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                <GlobalStyle />
                <RouterProvider router={GetRouter}></RouterProvider>;
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
