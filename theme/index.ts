import { palette } from "./palette";
export * from './typography';


const light = {
  mode: 'light',
  colors: palette.light,
}

const dark = {
  mode: 'dark',
  colors: palette.dark,
} as const;

const theme = {
  light,
  dark,
};

export type Theme = {
  colors: typeof palette.light;
  mode: 'light' | 'dark';
};

export default theme;