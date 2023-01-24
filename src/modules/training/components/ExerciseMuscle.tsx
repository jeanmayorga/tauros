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
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { Database } from "../../../types";
import { AddExercise } from "./AddExercise";
import { ExcersiceSelected } from "../types";

type Muscle = Database["public"]["Tables"]["muscles"]["Row"];

interface Props {
  muscle: Muscle;
  onDelete: (muscleId: number) => void;
}

export function ExerciseMuscle({ muscle, onDelete }: Props) {
  const [exercisesSelected, setExercisesSelected] = useState<
    ExcersiceSelected[]
  >([]);
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false);

  const handleCreateExercise = (excersiceSelected: ExcersiceSelected) => {
    setExercisesSelected([...exercisesSelected, excersiceSelected]);
  };

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
          <div>
            <Typography variant="h6">{muscle.name}</Typography>
            <Chip
              label={`4 Series`}
              variant="outlined"
              color="secondary"
              size="small"
              style={{ marginRight: "4px" }}
            />
            <Chip
              label={`10 Repeticiones`}
              variant="outlined"
              color="secondary"
              size="small"
            />
          </div>
          <IconButton aria-label="close" onClick={() => onDelete(muscle.id)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        {exercisesSelected.length === 0 && (
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
        {exercisesSelected.map((exerciseSelected) => (
          <Box
            key={1}
            paddingX={2}
            paddingY={1}
            borderBottom="1px solid rgba(255,255,255,.1)"
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">{exerciseSelected.name}</Typography>
            <div>
              <Chip
                label={`${exerciseSelected.series} Series`}
                variant="outlined"
                color="secondary"
                size="small"
                style={{ marginRight: "4px" }}
              />
              <Chip
                label={`${exerciseSelected.repetitions} Repeticiones`}
                variant="outlined"
                color="secondary"
                size="small"
              />
            </div>
          </Box>
        ))}

        <AddExercise
          muscle={muscle}
          isOpen={isCreateExerciseOpen}
          setIsOpen={setIsCreateExerciseOpen}
          onSave={handleCreateExercise}
        />

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
