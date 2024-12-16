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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
})




const reusableStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  }
})



export {
  component,
  reusableStyle
};