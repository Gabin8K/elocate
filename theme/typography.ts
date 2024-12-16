import { StyleSheet } from "react-native";

const fonts = {
  WsEb: require('@/assets/fonts/WorkSans-ExtraBold.ttf'),
  WsB: require('@/assets/fonts/WorkSans-Bold.ttf'),
  WsSb: require('@/assets/fonts/WorkSans-Medium.ttf'),
  WsM: require('@/assets/fonts/WorkSans-Regular.ttf'),
}

export const typography = StyleSheet.create({
  title_eb: {
    fontSize: 45,
    fontFamily: 'WsEb',
    lineHeight: 45,
  },
  title_b: {
    fontSize: 45,
    fontFamily: 'WsB',
    lineHeight: 45,
  },
  title_m: {
    fontSize: 45,
    fontFamily: 'WsSb',
    lineHeight: 45,
  },
  title: {
    fontSize: 45,
    fontFamily: 'WsM',
    lineHeight: 45,
  },
  subtitle_eb: {
    fontSize: 30,
    fontFamily: 'WsEb',
    lineHeight: 30,
  },
  subtitle_b: {
    fontSize: 30,
    fontFamily: 'WsB',
    lineHeight: 30,
  },
  subtitle_m: {
    fontSize: 30,
    fontFamily: 'WsSb',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 30,
    fontFamily: 'WsM',
    lineHeight: 30,
  },
  body1_eb: {
    fontSize: 15,
    fontFamily: 'WsEb',
    lineHeight: 15,
  },
  body1_b: {
    fontSize: 15,
    fontFamily: 'WsB',
    lineHeight: 15,
  },
  body1_m: {
    fontSize: 15,
    fontFamily: 'WsSb',
    lineHeight: 15,
  },
  body1: {
    fontSize: 15,
    fontFamily: 'WsM',
    lineHeight: 15,
  },
  body2_eb: {
    fontSize: 10,
    fontFamily: 'WsEb',
    lineHeight:10,
  },
  body2_b: {
    fontSize: 10,
    fontFamily: 'WsB',
    lineHeight:10,
  },
  body2_m: {
    fontSize: 10,
    fontFamily: 'WsSb',
    lineHeight:10,
  },
  body2: {
    fontSize: 10,
    fontFamily: 'WsM',
    lineHeight:10,
  },
  caption_eb: {
    fontSize: 7,
    fontFamily: 'WsEb',
    lineHeight: 7,
  },
  caption_b: {
    fontSize: 7,
    fontFamily: 'WsB',
    lineHeight: 7,
  },
  caption_m: {
    fontSize: 7,
    fontFamily: 'WsSb',
    lineHeight: 7,
  },
  caption: {
    fontSize: 7,
    fontFamily: 'WsM',
    lineHeight: 7,
  }
});

export { fonts };