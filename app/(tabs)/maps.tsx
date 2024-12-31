import { Text } from "@/components/ui";
import { Slider } from "@/components/ui/slider";
import { reusableStyle } from "@/theme/reusables";
import { View } from "react-native";

export default function Page() {
  return (
    <View
      style={[
        reusableStyle.fullCenter,
        {
          paddingHorizontal: 70,
          rowGap: 50,
        }
      ]}
    >
      <Text>Maps</Text>
      <Slider
        onChange={(value) => console.log(value)}
      />
    </View>
  )
}