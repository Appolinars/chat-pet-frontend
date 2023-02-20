import { FC, PropsWithChildren } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme } from "../config/theme";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      // dark: "#ff4400",
      main: lightTheme.accent,
      // light: "#ff4400",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root.Mui-focused": {
            color: lightTheme.accent,
          },
          "& .MuiOutlinedInput-root": {
            "& > fieldset": {
              transition: "border-color .3s",
            },
          },
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderWidth: "1px",
              // borderColor: lightTheme.accent,
            },
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderWidth: "1px",
              borderColor: lightTheme.accent,
            },
          },
        },
      },
    },
  },
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <MUIThemeProvider theme={darkTheme}>{children}</MUIThemeProvider>;
};
