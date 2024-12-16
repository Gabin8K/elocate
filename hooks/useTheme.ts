import  AppTheme, { Theme } from "@/theme";
import { useSetting } from "./useSetting";

export function useTheme() {
  const { mode } = useSetting();

  const theme = AppTheme[mode] as Theme;
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider")
  };
  return theme;
}