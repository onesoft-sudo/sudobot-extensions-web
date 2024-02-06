"use client";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";

const lightTheme = createTheme({});
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
export default function MUIProvider({ children }: PropsWithChildren) {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
            {children}
        </ThemeProvider>
    );
}
