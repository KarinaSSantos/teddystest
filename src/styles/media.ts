import type { DefaultTheme } from "styled-components";

export const media = (theme: DefaultTheme) => ({
  xs: `(min-width: ${theme.breakpoints.xs})`,
  sm: `(min-width: ${theme.breakpoints.sm})`,
  md: `(min-width: ${theme.breakpoints.md})`,
  lg: `(min-width: ${theme.breakpoints.lg})`,
  xl: `(min-width: ${theme.breakpoints.xl})`,
  xxl: `(min-width: ${theme.breakpoints.xxl})`,
});
