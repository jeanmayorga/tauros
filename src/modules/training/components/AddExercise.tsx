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
        <Box mb={2}>
          <Autocomplete
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setValue({
                  title: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  title: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.title
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={top100Films}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Ejercicio" />
            )}
          />
        </Box>
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
