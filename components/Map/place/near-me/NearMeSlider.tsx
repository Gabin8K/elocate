import { FC, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { Text } from "@/components/ui";
import { Slider } from "@/components/ui/slider";
import Animated, { FadeIn } from "react-native-reanimated";



export const NearMeSlider: FC = memo(function NearMeSlider() {

  const [value, setValue] = useState(0);
  const km = Math.floor(value / 5);


  return (
    <Animated.View
      entering={FadeIn.delay(200)}
      style={styles.container}
    >
      <View>
        <Text
          style={styles.text}
        >
          Showing:{' '}
          <Text
            variant={'body2_b'}
            color={'primary'}
          >
            0 locations
          </Text>
        </Text>
        <Text>
          Within:{' '}
          <Text
            variant={'body2_b'}
            color={'primary'}
          >
            {km} km
          </Text>
        </Text>
      </View>
      <Slider
        onChange={setValue}
      />
    </Animated.View>
  );
});



const styles = StyleSheet.create({
  container: {
    padding: spacing.l,
    rowGap: spacing.l,
  },
  text: {
    lineHeight: 22,
    paddingRight: spacing.lg,
  }
})