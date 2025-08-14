import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      textplaceholder: string;
      border: string;
      success: string;
      error: string;
      warning: string;
      navmobile: string;
    };
    font: {
      family: string;
      familynavbar: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
  }
}
