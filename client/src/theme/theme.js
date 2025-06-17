import { createTheme } from '@mui/material/styles';
import Palette from './colors/colorLogic';
import Text from './typography/textLogic';

export const theme = createTheme({
    palette: Palette,
    typography: Text,
    shape: {
        borderRadius: "10px"
    }
})