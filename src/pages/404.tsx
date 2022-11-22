import { Box, Typography } from "@mui/material";
import { AppBar } from "../components";

export default function Page() {
  return (
    <>
      <AppBar withBack />
      <Box p={2}>
        <Typography variant="h6">Pagina no encontrada</Typography>
      </Box>
    </>
  );
}
