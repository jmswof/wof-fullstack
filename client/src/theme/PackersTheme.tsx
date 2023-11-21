import { createTheme } from '@mui/material/styles';

import { red, grey } from '@mui/material/colors';

export const packersTheme = createTheme({
  palette: {
    primary: {
      main: red[800]
    },
    grey: grey,
    secondary: red
  }
});