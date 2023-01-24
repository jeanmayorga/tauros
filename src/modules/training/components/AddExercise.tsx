import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Database } from "../../../types";
import { ExcersiceSelected } from "../types";

type Muscle = Database["public"]["Tables"]["muscles"]["Row"];

interface Props {
  isOpen: boolean;
  muscle: Muscle;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSave: (data: ExcersiceSelected) => void;
}

export function AddExercise({ isOpen, setIsOpen, muscle, onSave }: Props) {
  function handleCreateExersice() {
    onSave({
      name: "",
      series: 3,
      repetitions: 3,
    });
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Agregar ejercicio</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField fullWidth label="Nombre" />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="Series" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Repeticiones" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        <Button onClick={handleCreateExersice}>Agregar</Button>
      </DialogActions>
    </Dialog>
  );
}
