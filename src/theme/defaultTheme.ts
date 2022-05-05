import { DefaultTheme } from 'styled-components';

type Partial<T> = {
  [key in keyof T]?: T[key];
};

declare module 'styled-components' {
  export interface DefaultTheme {
    themeType: 'light' | 'dark';
    palette: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      info: string;
      background: string;
      grey: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
      };
    };
    breakpoints: {
      desktop: number;
      laptop: number;
      mobile: number;
      tablet: number;
      down: (breakpoint: number) => string;
      up: (breakpoint: number) => string;
    };
    spacing: (value: number) => string;
  }
}

const defaultTheme: Partial<DefaultTheme> = {
  palette: {
    primary: '#55aaff',
    secondary: '#aa77ff',
    background: '#f0f0f0',
    success: '#22ff88',
    error: '#ee4455',
    warning: '#dde044',
    info: '#9494a0',
    grey: {
      50: "#efefef",
      100: "#efefef",
      200: "#efefef",
      300: "#efefef",
      400: "#efefef",
      500: "#efefef",
    },
  },
};
