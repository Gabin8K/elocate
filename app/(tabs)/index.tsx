import { Map } from "@/components/Map";
import { reusableStyle } from "@/theme/reusables";
import { View } from "react-native";

export default function Page() {
  return (
    <View
      style={reusableStyle.fullCenter}
    >
      <Map/>
    </View>
  )
}