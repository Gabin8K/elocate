import { StyleSheet } from "react-native";
import { palette } from "./palette";


const component = StyleSheet.create({
  shadow: {
    shadowColor: palette.light.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  card: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
})




const reusableStyle = StyleSheet.create({
  full:{
    flex: 1,
    width: "100%",
    height: "100%",
  },
  fullCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  }
})



export {
  component,
  reusableStyle
};