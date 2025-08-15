import type { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#EC6724",
    secondary: "#424242",
    background: "#F5F5F5",
    text: "#000000",
    textplaceholder: "#AAAAAA",
    textLight: "#AAAAAA",
    border: "#D9D9D9",
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
    navmobile: "#141414",
  },
  font: {
    family: "'Inter', sans-serif",
    familynavbar: "'Geologica', sans-serif",
  },
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  },
};
