import { StyleSheet } from "react-native";

const fonts = {
  WsEb: require('@/assets/fonts/WorkSans-ExtraBold.ttf'),
  WsB: require('@/assets/fonts/WorkSans-Bold.ttf'),
  WsM: require('@/assets/fonts/WorkSans-Medium.ttf'),
  WsR: require('@/assets/fonts/WorkSans-Regular.ttf'),
}

export const typography = StyleSheet.create({
  title_eb: {
    fontSize: 22,
    fontFamily: 'WsEb',
    lineHeight: 24,
  },
  title_b: {
    fontSize: 22,
    fontFamily: 'WsB',
    lineHeight: 24,
  },
  title_m: {
    fontSize: 22,
    fontFamily: 'WsM',
    lineHeight: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: 'WsR',
    lineHeight: 24,
  },
  body1_eb: {
    fontSize: 19,
    fontFamily: 'WsEb',
    lineHeight: 22,
  },
  body1_b: {
    fontSize: 19,
    fontFamily: 'WsB',
    lineHeight: 22,
  },
  body1_m: {
    fontSize: 19,
    fontFamily: 'WsM',
    lineHeight: 22,
  },
  body1: {
    fontSize: 19,
    fontFamily: 'WsR',
    lineHeight: 22,
  },
  body2_eb: {
    fontSize: 16,
    fontFamily: 'WsEb',
    lineHeight: 18,
  },
  body2_b: {
    fontSize: 16,
    fontFamily: 'WsB',
    lineHeight: 18,
  },
  body2_m: {
    fontSize: 16,
    fontFamily: 'WsM',
    lineHeight: 18,
  },
  body2: {
    fontSize: 16,
    fontFamily: 'WsR',
    lineHeight: 18,
  },
  caption_eb: {
    fontSize: 12,
    fontFamily: 'WsEb',
    lineHeight: 14,
  },
  caption_b: {
    fontSize: 12,
    fontFamily: 'WsB',
    lineHeight: 14,
  },
  caption_m: {
    fontSize: 12,
    fontFamily: 'WsM',
    lineHeight: 14,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'WsR',
    lineHeight: 14,
  }
});

export { fonts };