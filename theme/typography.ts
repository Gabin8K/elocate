import { StyleSheet } from "react-native";

const fonts = {
  WsEb: require('@/assets/fonts/WorkSans-ExtraBold.ttf'),
  WsB: require('@/assets/fonts/WorkSans-Bold.ttf'),
  WsSb: require('@/assets/fonts/WorkSans-Medium.ttf'),
  WsM: require('@/assets/fonts/WorkSans-Regular.ttf'),
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
    fontFamily: 'WsSb',
    lineHeight: 28,
  },
  title: {
    fontSize: 28,
    fontFamily: 'WsM',
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
    fontFamily: 'WsSb',
    lineHeight: 19,
  },
  body1: {
    fontSize: 19,
    fontFamily: 'WsM',
    lineHeight: 19,
  },
  body2_eb: {
    fontSize: 14,
    fontFamily: 'WsEb',
    lineHeight:14,
  },
  body2_b: {
    fontSize: 14,
    fontFamily: 'WsB',
    lineHeight:14,
  },
  body2_m: {
    fontSize: 14,
    fontFamily: 'WsSb',
    lineHeight:14,
  },
  body2: {
    fontSize: 14,
    fontFamily: 'WsM',
    lineHeight:14,
  },
  caption_eb: {
    fontSize: 11,
    fontFamily: 'WsEb',
    lineHeight: 11,
  },
  caption_b: {
    fontSize: 11,
    fontFamily: 'WsB',
    lineHeight: 11,
  },
  caption_m: {
    fontSize: 11,
    fontFamily: 'WsSb',
    lineHeight: 11,
  },
  caption: {
    fontSize: 11,
    fontFamily: 'WsM',
    lineHeight: 11,
  }
});

export { fonts };