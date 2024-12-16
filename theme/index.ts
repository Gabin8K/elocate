import { palette } from "./palette";
export * from './typography';


const light = {
  colors: palette.light,
  mode: 'light',
}

const dark = {
  mode: 'dark',
  colors: palette.dark
}

const theme = {
  light,
  dark,
};

export type Theme = typeof light;
export default theme;