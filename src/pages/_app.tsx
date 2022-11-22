import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme, createEmotionCache } from "../config";
import "../styles/globals.css";
import { Layout } from "../components";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useAppLoadingStore } from "../store";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  initialSession: Session;
}

export default function MyApp(props: MyAppProps) {
  const router = useRouter();
  const { setIsAppLoading } = useAppLoadingStore();
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    initialSession,
  } = props;

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    const handleStart = () => setIsAppLoading(true);
    const handleComplete = () => setIsAppLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  });

  return (
    <CacheProvider value={emotionCache}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={initialSession}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionContextProvider>
    </CacheProvider>
  );
}
