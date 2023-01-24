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
  Autocomplete,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { muscles } from "../../../data";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSave: () => void;
  muscleId?: string;
}

export function ExerciseMuscle({ isOpen, setIsOpen, onSave }: Props) {
  function handleCreateExersice() {
    onSave();
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>Agregar ejercicio</DialogTitle>
      <DialogContent>
        <Box mb={2}></Box>
        <Box mb={2}>
          <TextField fullWidth label="Segundos de descanso" type="number" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
        <Button onClick={handleCreateExersice}>Agregar</Button>
      </DialogActions>
    </Dialog>
  );
}
