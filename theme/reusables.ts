import { StyleSheet } from "react-native";
import { palette } from "./palette";


const component = StyleSheet.create({
  shadow: {
    boxShadow: `0 4 4 ${palette.light.gray2}`,
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