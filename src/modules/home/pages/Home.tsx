import { Box, Typography } from "@mui/material";
import { AppBar } from "../../../components";
import { WithAuthProps } from "../../../hooks/withAuth";

export function HomePage({ profile }: WithAuthProps) {
  return (
    <Box p={2}>
      <AppBar />
      <Typography variant="h5">Hola, {profile.first_name}</Typography>
      <Typography variant="subtitle1">Te quedan 30 dias de gym.</Typography>
    </Box>
  );
}
