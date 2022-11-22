import { Box, Button, Paper, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppBar } from "../../../components";
import { useRouter } from "next/router";

export function TrainingPage() {
  const router = useRouter();
  return (
    <Box p={2}>
      <AppBar />
      <Box mb={2}>
        <Typography variant="h5">Registro de entrenamientos</Typography>
      </Box>
      <Box mb={2}>
        <Button
          startIcon={<Add />}
          fullWidth
          variant="contained"
          onClick={() => router.push("/training/create")}
        >
          Agregar entrenamiento
        </Button>
      </Box>
      <Paper elevation={2} component={Box} display="flex" p={1} mb={2}>
        <Box
          bgcolor="red"
          p={1}
          borderRadius={1}
          mr={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <div>
            <Typography variant="h6" lineHeight={1}>
              25
            </Typography>
            <Typography variant="subtitle2" lineHeight={1}>
              Julio
            </Typography>
          </div>
        </Box>
        <Box>
          <Typography variant="h6">Pecho</Typography>
          <Typography variant="overline">4 series - 15 repeticiones</Typography>
        </Box>
      </Paper>
    </Box>
  );
}
