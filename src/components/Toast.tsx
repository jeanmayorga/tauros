import { Alert, Snackbar } from "@mui/material";
import { useToastStore } from "../store/toast";

export function Toast() {
  const { isToastOpen, setIsToastOpen, toastText } = useToastStore();
  return (
    <Snackbar
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isToastOpen}
      onClose={() => setIsToastOpen(false)}
    >
      <Alert
        onClose={() => setIsToastOpen(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        {toastText}
      </Alert>
    </Snackbar>
  );
}
