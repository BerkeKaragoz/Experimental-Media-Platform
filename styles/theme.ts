import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  shapes: {
    borderRadius: 4,
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  colors: {
    primary: {
      main: "#e24",
      contrast: "white",
    },
    secondary: {
      main: "teal",
      contrast: "white",
    },
    paper: {
      main: "#f8f8f8",
      contrast: "black",
    },
  },
  fonts: {
    size: {
      tiny: 12,
      small: 15,
      medium: 18,
      large: 24,
      massive: 36,
    },
    weight: {
      light: 300,
      medium: 400,
      bold: 700,
    },
  },
  shadows: [
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  ],
  space: 8,
};

export default theme;
