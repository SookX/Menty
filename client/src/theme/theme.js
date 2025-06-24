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
                },
            }
        },
        // MuiCard: {
        //     styleOverrides: {
        //         root: {
        //             "&:hover": {
        //                 transform: "scale(1.05)"
        //             }
        //         }
        //     }
        // },
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