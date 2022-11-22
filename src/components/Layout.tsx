import { Box, Backdrop, CircularProgress } from "@mui/material";
import { useAppLoadingStore } from "../store";
import { Navigation } from "./Navigation";
import { Drawer } from "./Drawer";
import Head from "next/head";
import { Toast } from "./Toast";
import { Profile } from "../modules/profile";

interface Props {
  children: React.ReactNode;
  profile?: Profile;
  session?: string;
}
export function Layout({ children, profile, session }: Props) {
  const { isAppLoading, setIsAppLoading } = useAppLoadingStore();

  console.log({ profile, session });

  return (
    <Box>
      <Head>
        <title>Tauros</title>
      </Head>
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
      <Toast />
      <Drawer />
      <Box pt={7} pb={10}>
        {children}
      </Box>
      {session && profile && <Navigation profile={profile} />}
    </Box>
  );
}
