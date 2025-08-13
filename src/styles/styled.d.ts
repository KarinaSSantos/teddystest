import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
      success: string;
      error: string;
      warning: string;
    };
    font: {
      family: string;
    };
  }
}
