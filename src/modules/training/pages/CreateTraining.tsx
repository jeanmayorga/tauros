import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AppBar } from "../../../components";

const muscles = [
  {
    value: "trapecio",
    label: "Trapecio",
  },
  {
    value: "deltoide",
    label: "Deltoide",
  },
  {
    value: "triceps",
    label: "Triceps",
  },
  {
    value: "biceps",
    label: "Biceps",
  },
  {
    value: "antebrazo",
    label: "Antebrazo",
  },
  {
    value: "dorsales",
    label: "Dorsales",
  },
  {
    value: "pectorales",
    label: "Pectorales",
  },
  {
    value: "abdominales",
    label: "Abdominales",
  },
  {
    value: "oblicuos",
    label: "Oblicuos",
  },
  {
    value: "gluteos",
    label: "Gluteos",
  },
  {
    value: "aductores",
    label: "Aductores",
  },
  {
    value: "cuádriceps",
    label: "Cuadriceps",
  },
  {
    value: "isquiotibiales",
    label: "Isquiotibiales",
  },
  {
    value: "pantorillas",
    label: "Pantorillas",
  },
];

export function CreateTrainingPage() {
  const [muscle, setMuscle] = useState("");
  const [isOpenCreateMuscle, setIsOpenCreateMuscle] = useState(true);
  return (
    <Box p={2}>
      <AppBar title="Crear un entrenamiento" withBack />
      <Box mb={2}>
        <Typography variant="h6">Hoy</Typography>
      </Box>
      <Dialog
        open={isOpenCreateMuscle}
        onClose={() => setIsOpenCreateMuscle(false)}
      >
        <DialogTitle>Musculo</DialogTitle>
        <DialogContent>
          <Box my={2}>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel id="musculo-label">Musculo</InputLabel>
                <Select
                  value={muscle}
                  onChange={(e) => setMuscle(e.target.value)}
                  label="Musculo"
                  labelId="musculo-label"
                  id="musculo"
                >
                  {muscles.map((muscle) => (
                    <MenuItem key={muscle.value} value={muscle.value}>
                      {muscle.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Series"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Repeticiones"
                    variant="outlined"
                    type="number"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={2}>
              <TextField fullWidth label="Segundos de descanso" type="number" />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenCreateMuscle(false)}>Cancelar</Button>
          <Button onClick={() => setIsOpenCreateMuscle(false)}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
