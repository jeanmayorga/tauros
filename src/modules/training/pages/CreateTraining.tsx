import {
  Box,
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
  return (
    <Box p={2}>
      <AppBar title="Crear un entrenamiento" withBack />
      <Box mb={2}>
        <Typography variant="h6">Hoy</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={3}>
          <TextField label="Series" variant="outlined" type="number" />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Repts." variant="outlined" type="number" />
        </Grid>
      </Grid>
    </Box>
  );
}
