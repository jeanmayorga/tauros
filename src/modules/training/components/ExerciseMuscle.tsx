import { Add } from "@mui/icons-material";
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { muscles } from "../../../data";
import { useExercises } from "../../exersices";
import { useMuscles } from "../../muscles";

interface Props {
  muscleId: number;
  onDelete: (muscleId: number) => void;
}

interface Excersice {
  id: string;
  name: string;
  series: number;
  repetitions: number;
}

export function ExerciseMuscle({ muscleId, onDelete }: Props) {
  const { data: muscles } = useMuscles();
  const muscle = muscles?.find((muscle) => muscle.id === muscleId);
  const [exercises, setExercises] = useState<Excersice[]>([]);
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false);

  if (!muscle) return null;

  return (
    <Box mb={2}>
      <Paper elevation={3} component={Box}>
        <Box
          padding={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">{muscle?.name}</Typography>
          <IconButton aria-label="close" onClick={() => onDelete(muscleId)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        {exercises.length === 0 && (
          <Box
            padding={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2">
              No has agregado ningun ejercicio todavia.
            </Typography>
          </Box>
        )}
        {exercises.map((exercise) => (
          <Box
            key={1}
            paddingX={2}
            paddingY={1}
            borderBottom="1px solid rgba(255,255,255,.1)"
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">{exercise.name}</Typography>
            <div>
              <Chip
                label={`${exercise.series} Series`}
                variant="outlined"
                color="secondary"
                size="small"
                style={{ marginRight: "4px" }}
              />
              <Chip
                label={`${exercise.repetitions} Repeticiones`}
                variant="outlined"
                color="secondary"
                size="small"
              />
            </div>
          </Box>
        ))}
        <Dialog
          open={isCreateExerciseOpen}
          onClose={() => setIsCreateExerciseOpen(false)}
        >
          <DialogTitle>Agregar ejercicio</DialogTitle>
          <DialogContent>
            <Box mb={2}>
              <TextField fullWidth label="Segundos de descanso" type="number" />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCreateExerciseOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsCreateExerciseOpen(false)}>
              Agregar
            </Button>
          </DialogActions>
        </Dialog>

        <Divider />
        <Box>
          <Button
            startIcon={<Add />}
            fullWidth
            size="large"
            color="secondary"
            onClick={() => setIsCreateExerciseOpen(true)}
          >
            Agregar ejercicio
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
