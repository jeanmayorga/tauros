import {
  AppBar as MUIAppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowBack, Menu } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDrawerStore } from "../store";

interface Props {
  title?: string;
  withBack?: boolean;
}
export function AppBar({ title, withBack }: Props) {
  const router = useRouter();
  const { isAppDrawerOpen, setIsAppDrawerOpen } = useAppDrawerStore();

  return (
    <MUIAppBar
      component={Box}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      position="fixed"
      color="secondary"
    >
      <Toolbar variant="regular">
        {withBack ? (
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
        )}
        <Typography variant="h6" color="inherit" component="div">
          {title || "Tauros"}
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
}
