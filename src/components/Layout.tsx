import {
  AppBar,
  Box,
  SwipeableDrawer,
  IconButton,
  ListItem,
  Toolbar,
  Typography,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Code, ExitToApp, Menu } from "@mui/icons-material";
import { useState } from "react";
import { isIos } from "../utils";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAppLoadingStore } from "../store";
import { useToastStore } from "../store/toast";
import { Navigation } from "./Navigation";
import pkg from "../../package.json";

interface Props {
  children: React.ReactNode;
}
export function Layout({ children }: Props) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const { isAppLoading, setIsAppLoading } = useAppLoadingStore();
  const { isToastOpen, setIsToastOpen, toastText } = useToastStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  async function handleLogout() {
    setIsAppLoading(true);
    await supabase.auth.signOut();
    setIsDrawerOpen(false);
    setIsAppLoading(false);
  }

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
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isAppLoading}
        onClick={() => setIsAppLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        disableBackdropTransition={!isIos}
        disableDiscovery={isIos}
      >
        <Box width="250px">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText primary="Código fuente" />
              </ListItemButton>
            </ListItem>
            {session && (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Salir" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
          <Box mt={4} textAlign="center">
            <div>
              <Typography variant="caption">An app from:</Typography>
            </div>
            <Typography variant="caption">Jean Paul Mayorga</Typography>
            <div>
              <Typography variant="caption">v {pkg.version}</Typography>
            </div>
          </Box>
        </Box>
      </SwipeableDrawer>
      <AppBar position="fixed" color="secondary">
        <Toolbar variant="regular">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Tauros Gym
          </Typography>
        </Toolbar>
      </AppBar>
      <Box pt={7} paddingX={2} pb={isIos ? 10 : 7}>
        {children}
      </Box>
      <Navigation />
    </Box>
  );
}
