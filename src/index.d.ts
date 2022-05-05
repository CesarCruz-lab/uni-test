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
