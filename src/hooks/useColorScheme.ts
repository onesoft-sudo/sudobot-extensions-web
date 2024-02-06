import { useMediaQuery } from "@mui/material";

export function useColorScheme() {
    return useMediaQuery("(prefers-color-scheme: light)") ? "light" : "dark";
}
