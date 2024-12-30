import { StyleSheet } from "react-native";

const fonts = {
  WsEb: require('@/assets/fonts/WorkSans-ExtraBold.ttf'),
  WsB: require('@/assets/fonts/WorkSans-Bold.ttf'),
  WsM: require('@/assets/fonts/WorkSans-Medium.ttf'),
  WsR: require('@/assets/fonts/WorkSans-Regular.ttf'),
}

export const typography = StyleSheet.create({
  title_eb: {
    fontSize: 28,
    fontFamily: 'WsEb',
    lineHeight: 28,
  },
  title_b: {
    fontSize: 28,
    fontFamily: 'WsB',
    lineHeight: 28,
  },
  title_m: {
    fontSize: 28,
    fontFamily: 'WsM',
    lineHeight: 28,
  },
  title: {
    fontSize: 28,
    fontFamily: 'WsR',
    lineHeight: 28,
  },
  body1_eb: {
    fontSize: 19,
    fontFamily: 'WsEb',
    lineHeight: 19,
  },
  body1_b: {
    fontSize: 19,
    fontFamily: 'WsB',
    lineHeight: 19,
  },
  body1_m: {
    fontSize: 19,
    fontFamily: 'WsM',
    lineHeight: 19,
  },
  body1: {
    fontSize: 19,
    fontFamily: 'WsR',
    lineHeight: 19,
  },
  body2_eb: {
    fontSize: 16,
    fontFamily: 'WsEb',
    lineHeight:16,
  },
  body2_b: {
    fontSize: 16,
    fontFamily: 'WsB',
    lineHeight:16,
  },
  body2_m: {
    fontSize: 16,
    fontFamily: 'WsM',
    lineHeight:16,
  },
  body2: {
    fontSize: 16,
    fontFamily: 'WsR',
    lineHeight:16,
  },
  caption_eb: {
    fontSize: 12,
    fontFamily: 'WsEb',
    lineHeight: 12,
  },
  caption_b: {
    fontSize: 12,
    fontFamily: 'WsB',
    lineHeight: 12,
  },
  caption_m: {
    fontSize: 12,
    fontFamily: 'WsM',
    lineHeight: 12,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'WsR',
    lineHeight: 12,
  }
});

export { fonts };