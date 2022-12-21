import type { AppProps } from "next/app";
import "../styles/index.scss";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import GlobalStyle, { theme } from "../components/globalstyles";
import { Provider } from "react-redux";
import store from "../app/store";
import Layout from "../components/layout";
import { SnackbarProvider } from "notistack";

import { SocketContext } from "../context/socketContext";
// //////////////////////
import { createTheme } from "@mui/material/styles";
// Create a theme instance.
const Muitheme = createTheme(theme);
import createCache from "@emotion/cache";
function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
// //////////////////////

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
      }}
    >
      <CacheProvider value={emotionCache}>
        <CacheProvider value={emotionCache}>
          {/* <SocketContext> */}
          <MuiThemeProvider theme={Muitheme}>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
                <CssBaseline />
                <GlobalStyle />
              </ThemeProvider>
            </Provider>
          </MuiThemeProvider>
          {/* </SocketContext> */}
        </CacheProvider>
      </CacheProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
