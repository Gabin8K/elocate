import { Text } from "@/components/ui";
import { reusableStyle } from "@/theme/reusables";
import { View } from "react-native";

export default function Page() {
  return (
    <View
      style={reusableStyle.fullCenter}
    >
      <Text>Maps</Text>
    </View>
  )
}