import { createGlobalStyle } from "styled-components";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ThemedStyledInterface } from "styled-components";
export const styled: ThemedStyledInterface<Theme> =
  require("styled-components").default;
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
  bgNav: {
    light: string;
    dark: string;
  };
  text: {
    light: string;
    dark: string;
  };
  palette: {
    primary: {
      light?: string;
      main: string;
      dark?: string;
    };
    secondary: {
      light?: string;
      main: string;
      dark?: string;
    };
    success: {
      light?: string;
      main: string;
      dark?: string;
    };
    warning: {
      light?: string;
      main: string;
      dark?: string;
    };
    error: {
      light?: string;
      main: string;
      dark?: string;
    };
    info: {
      light?: string;
      main: string;
      dark?: string;
    };
  };
}

export const theme: Theme = {
  mode: "dark",
  colors: {
    light: "#ddd",
    dark: "linear-gradient(180deg, #4E0044 0%, rgba(78, 0, 68, 0) 100%);",
  },
  palette: {
    primary: { main: "#B2ABF2" },
    secondary: { main: "#aaaaaa" },
    success: { main: "#00ff6a" },
    error: { main: "#ff0037" },
    warning: { main: "#ff8800" },
    info: { main: "#00aeff" },
  },
  bg: {
    dark: "#000",
    light: "#ddd",
  },
  text: {
    dark: "#fff",
    light: "#000",
  },
  bgNav: {
    dark: "linear-gradient(180deg, #4E0044 0%, rgba(78, 0, 68, 0) 100%);",
    light: "linear-gradient(180deg, #4E0044 0%, rgba(78, 0, 68, 0) 100%);",
  },
  typography: {
    fontSize: 13,
    h2: {
      fontSize: "0.9rem",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      color: "#87847a",
    },
    body1: {
      //for messages
      fontStyle: "normal",
      fontSize: "0.8rem",
      letterSpacing: "normal",
    },
    subtitle1: {
      fontSize: "0.8rem",
      fontWeight: "400",
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: "normal",
    },
  },
};

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  body {
    background-color: ${(props) => props.theme.bg[props.theme.mode]};
    color: ${(props) => props.theme.text[props.theme.mode]};
  }
  ${(props) =>
    Object.entries(props.theme.palette)
      .map(([key, value]) => {
        return ".bg-" + key + " { background-color: " + value.main + "; }";
      })
      .join("\n")}
  ${(props) =>
    Object.entries(props.theme.palette)
      .map(([key, value]) => {
        return ".text-" + key + " { color: " + value.main + "; }";
      })
      .join("\n")}

`;

export default GlobalStyle;
