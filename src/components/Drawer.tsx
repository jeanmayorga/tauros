import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import pkg from "../../package.json";
import { isIos } from "../utils";
import { Code, ExitToApp, Menu } from "@mui/icons-material";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAppDrawerStore, useAppLoadingStore } from "../store";
import { useRouter } from "next/router";
import cookies from "js-cookie";

export function Drawer() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const { setIsAppLoading } = useAppLoadingStore();
  const { isAppDrawerOpen, setIsAppDrawerOpen } = useAppDrawerStore();

  async function handleLogout() {
    setIsAppDrawerOpen(false);
    setIsAppLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    setIsAppLoading(false);
    cookies.remove("profile");
  }

  return (
    <SwipeableDrawer
      anchor="left"
      open={isAppDrawerOpen}
      onClose={() => setIsAppDrawerOpen(false)}
      onOpen={() => setIsAppDrawerOpen(true)}
      disableBackdropTransition={!isIos}
      disableDiscovery={isIos}
    >
      <Box width="250px" mt={7}>
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
          <div>
            <Typography variant="caption">{isIos && "Ios version"}</Typography>
          </div>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
