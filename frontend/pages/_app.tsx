import type { AppProps } from "next/app";
import "../styles/index.scss";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import GlobalStyle, { theme } from "../components/globalstyles";
// import { Provider } from "react-redux";
// import store from "../app/store";
import Layout from "../components/layout";
import { SocketContext } from "../context/socketContext";
// //////////////////////
import { createTheme } from "@mui/material/styles";
// Create a theme instance.
const Muitheme = createTheme(theme);
import createCache from "@emotion/cache";
import Notif from "../components/Notification";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import AppLoading from "../public/Apploading.json";

const queryClient = new QueryClient();

function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
// //////////////////////
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp(props: MyAppProps) {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    ...AppProps
  } = props;

  useEffect(() => {
    // const getCurrentUser = async () => {
    //   try {
    //     const res = await axios.get("/");
    //     if (res.data) {
    //       if (AppProps.router.pathname === "/login") {
    //         await navigate.replace("/home");
    //       }
    //       setTimeout(() => setIsLoading(false), 1500);
    //     }
    //   } catch (e) {
    //     if (AppProps.router.pathname !== "/login") {
    //       await navigate.replace("/login");
    //     }
    //     setTimeout(() => setIsLoading(false), 1500);
    //   }
    // };
    // getCurrentUser();
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Lottie
          animationData={AppLoading}
          loop
          style={{
            width: 500,
            height: 500,
          }}
        />
      </div>
    );
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <SocketContext>
          <MuiThemeProvider theme={Muitheme}>
            {/* <Provider store={store}> */}
            <ThemeProvider theme={theme}>
              {AppProps.router.pathname !== "/login" && !isLoading ? (
                <Layout>
                  {!AppProps.router.pathname.match(/\/game\/.*/g) && <Notif />}
                  <Component {...pageProps} />
                </Layout>
              ) : (
                <Component {...pageProps} />
              )}
              <CssBaseline />
              <GlobalStyle />
            </ThemeProvider>
            {/* </Provider> */}
          </MuiThemeProvider>
        </SocketContext>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
