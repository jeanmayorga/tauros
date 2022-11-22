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

export function Navigation() {
  const theme = useTheme();
  const router = useRouter();
  const session = useSession();

  const mainViewName = router.asPath.includes("auth") ? "/auth" : router.asPath;

  if (!session) return null;

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bgcolor={theme.palette.background.default}
    >
      <Box marginBottom="24px">
        <BottomNavigation
          component={Box}
          showLabels
          value={mainViewName}
          onChange={(_event, viewName) => {
            router.push(viewName);
          }}
        >
          <BottomNavigationAction value="/" label="Inicio" icon={<Home />} />
          <BottomNavigationAction
            value="/training"
            label="Entrenamiento"
            icon={<FitnessCenter />}
          />
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
