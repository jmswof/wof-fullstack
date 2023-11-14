import { createTheme } from '@mui/material/styles';

export const packersTheme = createTheme({
    palette: {
        primary: {
            main: "#DC3B42", //#dc3b42
            light: "#E83F47",
            dark: "#9C2A30",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#595959",
            light: "#4f5b62",
            dark: "#000a12",
            contrastText: "#ffffff",
        },
    }
});