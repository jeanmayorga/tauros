import { Add } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { AppBar } from "../../../components";
import { Database } from "../../../types/supabase";
import { useMuscles } from "../../muscles";
import { ExerciseMuscle } from "../components/ExerciseMuscle";

type Muscle = Database["public"]["Tables"]["muscles"]["Row"];

export function CreateTrainingPage() {
  const { data: muscles } = useMuscles();
  const [isAddMuscleOpen, setIsAddMuscleOpen] = useState(false);
  const [musclesSelected, setMusclesSelected] = useState<Muscle[]>([]);

  const addToMuscles = (muscle: Muscle) => {
    setMusclesSelected([...musclesSelected, muscle]);
    setIsAddMuscleOpen(false);
  };

  const removeFromMuscles = (muscleId: number) => {
    const newMusclesSelected = musclesSelected.filter(
      (muscleSelected) => muscleSelected.id !== muscleId
    );
    setMusclesSelected(newMusclesSelected);
  };

  return (
    <Box p={2}>
      <AppBar title="Crear un entrenamiento" withBack />
      <Box mb={2}>
        <Typography variant="h6">Hoy</Typography>
      </Box>
      {musclesSelected.length === 0 && (
        <Box
          padding={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body2">
            No has agregado ningun musculo para trabajar todavia.
          </Typography>
        </Box>
      )}

      {musclesSelected.map((muscle) => (
        <ExerciseMuscle
          muscle={muscle}
          key={muscle.id}
          onDelete={removeFromMuscles}
        />
      ))}

      {muscles && (
        <>
          <Dialog
            onClose={() => setIsAddMuscleOpen(false)}
            open={isAddMuscleOpen}
            sx={{ zIndex: 10000 }}
          >
            <DialogTitle>Musculos</DialogTitle>
            <List sx={{ pt: 0 }}>
              {muscles.map((muscle) => (
                <ListItem disableGutters key={muscle.id}>
                  <ListItemButton
                    onClick={() => addToMuscles(muscle)}
                    key={muscle.id}
                  >
                    <ListItemText primary={muscle.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Dialog>

          <Box mb={2} mt={4}>
            <Button
              startIcon={<Add />}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => setIsAddMuscleOpen(true)}
            >
              Agregar musculo
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
