import {
  AccountCircle,
  Home,
  FitnessCenter,
  AdminPanelSettings,
} from "@mui/icons-material";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { Profile } from "../modules/profile";

interface Props {
  profile: Profile;
}
export function Navigation({ profile }: Props) {
  const theme = useTheme();
  const router = useRouter();

  const mainViewName = router.asPath.includes("auth") ? "/auth" : router.asPath;

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      bgcolor={theme.palette.background.default}
      zIndex="9999"
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
          {profile?.roles?.includes("gym") && (
            <BottomNavigationAction
              value="/training"
              label="Entrenamiento"
              icon={<FitnessCenter />}
            />
          )}
          <BottomNavigationAction
            value="/account"
            label="Cuenta"
            icon={<AccountCircle />}
          />
          {profile?.roles?.includes("admin") && (
            <BottomNavigationAction
              value="/admin"
              label="Administrar"
              icon={<AdminPanelSettings />}
            />
          )}
        </BottomNavigation>
      </Box>
    </Box>
  );
}
