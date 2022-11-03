import {
  AccountCircle,
  Home,
  FitnessCenter,
  EmojiPeople,
} from "@mui/icons-material";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { isIos } from "../utils";

export function Navigation() {
  const session = useSession();
  const theme = useTheme();
  const router = useRouter();

  function mainViewName() {
    const path = router.asPath;
    if (path.includes("auth")) {
      return "/auth";
    }
    return path;
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bgcolor={theme.palette.background.default}
    >
      <div style={{ marginBottom: isIos ? "24px" : 0 }}>
        <BottomNavigation
          component={Box}
          showLabels
          value={mainViewName()}
          onChange={(_event, viewName) => {
            router.push(viewName);
          }}
        >
          <BottomNavigationAction value="/" label="Inicio" icon={<Home />} />
          {session && (
            <BottomNavigationAction
              value="/health"
              label="Salud"
              icon={<EmojiPeople />}
            />
          )}
          {session && (
            <BottomNavigationAction
              value="/routines"
              label="Rutina"
              icon={<FitnessCenter />}
            />
          )}
          <BottomNavigationAction
            value="/auth"
            label="Cuenta"
            icon={<AccountCircle />}
          />
        </BottomNavigation>
      </div>
    </Box>
  );
}
