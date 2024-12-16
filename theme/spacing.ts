import { Dimensions } from "react-native"

const { width, height } = Dimensions.get('window');

export const spacing = {
  s: 8,
  m: 16,
  l: 24,
  lg: 32,
  xl: 40,
  xxl: 50,
  width,
  height,
}