import {
  AppBar as MUIAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowBack, Menu, FitnessCenter } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDrawerStore } from "../store";
import { useSession } from "@supabase/auth-helpers-react";

interface Props {
  title?: string;
  withBack?: boolean;
}
export function AppBar({ title, withBack }: Props) {
  const router = useRouter();
  const session = useSession();
  const { isAppDrawerOpen, setIsAppDrawerOpen } = useAppDrawerStore();

  return (
    <MUIAppBar
      component={Box}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      position="fixed"
    >
      <Toolbar variant="regular">
        {session ? (
          withBack ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => router.back()}
            >
              <ArrowBack />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsAppDrawerOpen(!isAppDrawerOpen)}
            >
              <Menu />
            </IconButton>
          )
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FitnessCenter />
          </IconButton>
        )}
        {session ? (
          <Typography variant="h6" color="inherit" component="div">
            {title || "Tauros"}
          </Typography>
        ) : (
          <Typography variant="h6" color="inherit" component="div">
            Tauros
          </Typography>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}
