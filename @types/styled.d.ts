import "styled-components";

declare module "styled-components" {
  interface Color {
    main: string;
    light?: string;
    dark?: string;
    contrast: string;
  }

  export interface DefaultTheme {
    shapes: {
      borderRadius: number;
    };
    breakpoints: Record<"xs" | "sm" | "md" | "lg" | "xl", number>;
    colors: {
      primary: Color;
      secondary: Color;
      paper: Color;
      [key: string]: Color;
    };
    fonts: {
      size: {
        tiny: number;
        small: number;
        medium: number;
        large: number;
        massive: number;
      };
      family?: string;
      weight: {
        light: number;
        medium: number;
        bold: number;
      };
    };
    props?: Object;
    shadows: Array<string>;
    space: number;
    zIndexes?: {
      [key: string]: number;
    };
  }
}
