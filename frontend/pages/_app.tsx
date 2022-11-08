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
import axios from "axios";
import { useRouter } from "next/router";
// //////////////////////
import { createTheme } from "@mui/material/styles";
// Create a theme instance.
const Muitheme = createTheme(theme);
import createCache from "@emotion/cache";
import { useEffect } from "react";
function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
// //////////////////////

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

axios.defaults.baseURL = "http://192.168.10.80:3001";
axios.defaults.withCredentials = true;

function MyApp(props: MyAppProps) {
  const router = useRouter();
  const testApi = async () => {
    try {
      const res = await axios.get("/");
      console.log(res.data);
    } catch (e) {
      console.log(e);
      router.push("/login");
    }
  };
  useEffect(() => {
    testApi();
  }, []);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
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
    </CacheProvider>
  );
}

export default MyApp;
