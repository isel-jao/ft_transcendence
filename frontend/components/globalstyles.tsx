import { createGlobalStyle } from "styled-components";
import { ThemeOptions } from "@mui/material/styles";

export interface Theme extends ThemeOptions {
  mode: "light" | "dark";
  colors: {
    light: string;
    dark: string;
  };
  bg: {
    light: string;
    dark: string;
  };
  text: {
    light: string;
    dark: string;
  };
}

export const theme: Theme = {
  mode: "dark",
  colors: {
    light: "#ddd",
    dark: "#444",
  },
  palette: {
    primary: { main: "#00e297" },
    secondary: { main: "#aaaaaa" },
    success: { main: "#00ff6a" },
    error: { main: "#ff0037" },
    warning: { main: "#ff8800" },
    info: { main: "#00aeff" },
  },
  bg: {
    dark: "#333",
    light: "#ddd",
  },
  text: {
    dark: "#fff",
    light: "#000",
  },
};

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    background-color: ${(props) => props.theme.bg[props.theme.mode]};
    color: ${(props) => props.theme.text[props.theme.mode]};
`;

export default GlobalStyle;
