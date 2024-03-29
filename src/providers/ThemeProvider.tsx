import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';


export const colorTheme = {
  bg: '#0f0e07',
  accent: '#33CCCC',
  font: '#e7dfe4',
};

const materialTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colorTheme.accent,
    },
  },
  typography: {
    fontFamily: 'Rubik',
    fontSize: 16,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '&': {
            backgroundColor: colorTheme.bg,
          },
          '& .MuiFormLabel-root.Mui-focused': {
            color: colorTheme.accent,
          },
          '& .MuiOutlinedInput-root': {
            '& > fieldset': {
              transition: 'border-color .3s',
            },
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            '& > fieldset': {
              borderWidth: '1px',
            },
          },
          '& .MuiOutlinedInput-root:hover': {
            '& > fieldset': {
              borderWidth: '1px',
              borderColor: colorTheme.accent,
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&': {
            transition: 'background-color .4s',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '& .MuiLoadingButton-loadingIndicator': {
            color: colorTheme.accent,
          },
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <MUIThemeProvider theme={materialTheme}>{children}</MUIThemeProvider>;
};