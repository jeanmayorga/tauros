import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AccountBox, ExitToApp, Https } from "@mui/icons-material";
import { useAppLoadingStore } from "../../../store";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AppBar } from "../../../components";
import cookies from "js-cookie";

export function AccountPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { setIsAppLoading } = useAppLoadingStore();

  async function handleLogout() {
    setIsAppLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    setIsAppLoading(false);
    cookies.remove("profile");
  }
  return (
    <Box>
      <AppBar title="Cuenta" />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("account/information")}>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Actualizar información" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push("account/password")}>
            <ListItemIcon>
              <Https />
            </ListItemIcon>
            <ListItemText primary="Cambiar contraseña" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
