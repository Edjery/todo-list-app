import { createContext } from "vm";
import { createTheme } from "./lib/MUI-core-v4";
import { useMemo, useState } from "react";

export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#ebe7e1",
          200: "#d6cfc2",
          300: "#c2b7a4",
          400: "#ad9f85",
          500: "#998767",
          600: "#7a6c52",
          700: "#5c513e",
          800: "#3d3629",
          900: "#1f1b15",
        },
        secondary: {
          100: "#efece7",
          200: "#ded9ce",
          300: "#cec5b6",
          400: "#bdb29d",
          500: "#ad9f85",
          600: "#8a7f6a",
          700: "#685f50",
          800: "#454035",
          900: "#23201b",
        },
        neutral: {
          100: "#f3f1ed",
          200: "#e7e2db",
          300: "#dad4c8",
          400: "#cec5b6",
          500: "#c2b7a4",
          600: "#9b9283",
          700: "#746e62",
          800: "#4e4942",
          900: "#272521",
        },
        background: {
          100: "#f7f5f3",
          200: "#efece7",
          300: "#e6e2da",
          400: "#ded9ce",
          500: "#d6cfc2",
          600: "#aba69b",
          700: "#807c74",
          800: "#56534e",
          900: "#2b2927",
        },
        white: {
          100: "#fbfaf9",
          200: "#f7f5f3",
          300: "#f3f1ed",
          400: "#efece7",
          500: "#ebe7e1",
          600: "#bcb9b4",
          700: "#8d8b87",
          800: "#5e5c5a",
          900: "#2f2e2d",
        },
      }
    : {
        primary: {
          100: "#1f1b15",
          200: "#3d3629",
          300: "#5c513e",
          400: "#7a6c52",
          500: "#998767",
          600: "#ad9f85",
          700: "#c2b7a4",
          800: "#d6cfc2",
          900: "#ebe7e1",
        },
        secondary: {
          100: "#23201b",
          200: "#454035",
          300: "#685f50",
          400: "#8a7f6a",
          500: "#ad9f85",
          600: "#bdb29d",
          700: "#cec5b6",
          800: "#ded9ce",
          900: "#efece7",
        },
        neutral: {
          100: "#272521",
          200: "#4e4942",
          300: "#746e62",
          400: "#9b9283",
          500: "#c2b7a4",
          600: "#cec5b6",
          700: "#dad4c8",
          800: "#e7e2db",
          900: "#f3f1ed",
        },
        background: {
          100: "#2b2927",
          200: "#56534e",
          300: "#807c74",
          400: "#aba69b",
          500: "#d6cfc2",
          600: "#ded9ce",
          700: "#e6e2da",
          800: "#efece7",
          900: "#f7f5f3",
        },
        white: {
          100: "#2f2e2d",
          200: "#5e5c5a",
          300: "#8d8b87",
          400: "#bcb9b4",
          500: "#ebe7e1",
          600: "#efece7",
          700: "#f3f1ed",
          800: "#f7f5f3",
          900: "#fbfaf9",
        },
      }),
});

export const themeSettings = (mode: string) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: { main: colors.primary[100] },
            secondary: { main: colors.secondary[500] },
            neutral: {
              dark: colors.neutral[700],
              main: colors.neutral[500],
              light: colors.neutral[100],
            },
            background: { default: colors.primary[500] },
          }
        : {
            primary: { main: colors.primary[500] },
            secondary: { main: colors.secondary[500] },
            neutral: {
              dark: colors.neutral[700],
              main: colors.neutral[500],
              light: colors.neutral[100],
            },
            background: { default: colors.primary[500] },
          }),
    },
  };
};

export const ColorModeContext = createContext({
  toggleContextMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return { theme, colorMode };
};
