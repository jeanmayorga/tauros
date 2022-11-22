import {
  Box,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { isIos } from "../utils";
import { useAppLoadingStore } from "../store";
import { useToastStore } from "../store/toast";
import { Navigation } from "./Navigation";
import { Drawer } from "./Drawer";

interface Props {
  children: React.ReactNode;
}
export function Layout({ children }: Props) {
  const { isAppLoading, setIsAppLoading } = useAppLoadingStore();
  const { isToastOpen, setIsToastOpen, toastText } = useToastStore();

  return (
    <Box>
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
      <Backdrop
        sx={{
          color: "#fff",
          background: "#121212",
          zIndex: "999",
        }}
        open={isAppLoading}
        onClick={() => setIsAppLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Drawer />
      <Box pt={7} pb={10}>
        {children}
      </Box>
      <Navigation />
    </Box>
  );
}
