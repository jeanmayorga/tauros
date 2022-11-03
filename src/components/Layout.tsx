import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
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
import {
  AccountCircle,
  Code,
  ExitToApp,
  Home,
  Menu,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useState } from "react";
import { iOS } from "../utils";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAppLoadingStore } from "../store";
import { useToastStore } from "../store/toast";

interface Props {
  children: React.ReactNode;
}
export function Layout({ children }: Props) {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const { isAppLoading, setIsAppLoading } = useAppLoadingStore();
  const { isToastOpen, setIsToastOpen, toastText } = useToastStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function mainViewName() {
    const path = router.asPath;
    if (path.includes("auth")) {
      return "/auth";
    }
    return path;
  }

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
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
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
        </Box>
      </SwipeableDrawer>
      <AppBar position="fixed">
        <Toolbar variant="dense">
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
      <Box pt={6} pb={7}>
        {children}
      </Box>
      <Box position="fixed" bottom="0" width="100%">
        <BottomNavigation
          showLabels
          value={mainViewName()}
          onChange={(event, viewName) => {
            router.push(viewName);
          }}
        >
          <BottomNavigationAction value="/" label="Inicio" icon={<Home />} />
          <BottomNavigationAction
            value="/auth"
            label="Cuenta"
            icon={<AccountCircle />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
