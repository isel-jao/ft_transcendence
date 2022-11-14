import { createGlobalStyle } from "styled-components";
import { ThemeOptions } from "@mui/material/styles";
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
  mode: "light",
  colors: {
    light: "#ddd",
    dark: "#444",
  },
  palette: {
    primary: { main: "#00b0b6" },
    secondary: { main: "#aaaaaa" },
    success: { main: "#00ff6a" },
    error: { main: "#ff0037" },
    warning: { main: "#ff8800" },
    info: { main: "#00aeff" },
  },
  bg: {
    dark: "#333",
    light: "#120F19",
    // light: "white",
  },
  text: {
    dark: "#fff",
    light: "#000",
  },
  typography: {
    subtitle1: {
      fontSize: 12,
      // color: "#696969",
      color: "#fff",
    },
    subtitle2: {
      //online offline
      fontSize: 10,
      color: "#fff",
    },
    body1: {
      fontSize: 14,
      color: "#fff",
    },
    h1: {
      fontSize: 18,
      fontWeight: 600,
      color: "#fff",
    },
    h2: {
      //owner members..
      fontSize: 13,
      fontWeight: 600,
      color: "#fff",
    },
    button: {
      backgroundColor: "green",
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
