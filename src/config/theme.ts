import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: red[400],
    },
    secondary: {
      main: "#f44336",
    },
  },
});
