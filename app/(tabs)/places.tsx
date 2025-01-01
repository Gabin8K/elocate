import { HeaderChild } from "@/components/layout/header";
import { Text } from "@/components/ui";
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
      <HeaderChild>
        <Text>
          Nombre de places: 0
        </Text>
      </HeaderChild>
    </View>
  )
}