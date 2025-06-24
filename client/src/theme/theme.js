import { createTheme } from '@mui/material/styles';
import Palette from './colors/colorLogic';
import Text from './typography/textLogic';

export const theme = createTheme({
    palette: Palette,
    typography: Text,
    shape: {
        borderRadius: "10px",
        sectionBorderRadius: "70px"
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    padding: "12px 64px",
                    boxShadow: "0 0 0.8rem rgba(0, 0, 0, 0.1)"
                },
                colorTransparent: {
                    background: Palette.background.main
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                dense: {
                    minHeight: "0px"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontSize: "16px",
                    padding: "16px 32px",
                    fontWeight: "bold",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none"
                    }
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: ["Nunito", 'sans-serif'].join(",")
                }
            }
        }
    }
})

theme.typography.h1 = {
    ...theme.typography.h1,
    [theme.breakpoints.down("md")]: {
        fontSize: "48px"
    }
}

theme.typography.h3 = {
    ...theme.typography.h3,
    [theme.breakpoints.down("md")]: {
        fontSize: "36px"
    }
}

theme.components.MuiButton.styleOverrides = {
    ...theme.components.MuiButton.styleOverrides,
    containedPrimary: {
        "&:hover": {
            background: "transparent",
            border: "solid 1px",
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main
        }
    },
    containedTertiary: {
        background: theme.palette.tertiary.shade2,
        "&:hover": {
            background: "transparent",
            border: "solid 1px",
            borderColor: theme.palette.tertiary.shade2,
            color: theme.palette.tertiary.shade2
        }
    }
}

theme.components.MuiAppBar.styleOverrides.root = {
    ...theme.components.MuiAppBar.styleOverrides.root,
    [theme.breakpoints.down("sm")]: { 
        padding: "12px 24px" 
    }
}