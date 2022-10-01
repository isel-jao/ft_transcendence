import { createGlobalStyle } from "styled-components";

export interface DefaultTheme {
  colors: {
    primary?: string;
    secondary?: string;
    success?: string;
    danger?: string;
    warning?: string;
    info?: string;
    light?: string;
    dark?: string;
  };
}

export const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#aaaaaa",
    success: "#00ff6a",
    danger: "#ff0037",
    warning: "#ffd000",
    info: "#00aeff",
    light: "#f6f6f6",
    dark: "#111",
  },
};

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export default GlobalStyle;
