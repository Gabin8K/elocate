import { FC, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../ui";
import { Slider } from "../ui/slider";
import { spacing } from "@/theme/spacing";
import { HeaderChild } from "../layout/header";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";


export const HeaderPlace: FC = memo(function HeaderPlace() {
  return (
    <HeaderChild>
      <HeaderPlaceContent />
    </HeaderChild>
  )
})



const HeaderPlaceContent: FC = memo(function HeaderPlaceContent() {

  const { offsetY } = useScrollAnimated();
  const [value, setValue] = useState(0);

  const km = Math.floor(value / 5);

  const uas = useAnimatedStyle(() => {
    const height = interpolate(offsetY.value, [0, 100], [spacing.l + spacing.m, 0], 'clamp');
    const opacity = interpolate(offsetY.value, [0, 50], [1, 0], 'clamp');

    return {
      height,
      opacity,
    }
  }, []);


  return (
    <View
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
      <Animated.View
        style={[
          uas,
          styles.slider,
        ]}
      >
        <Slider
          onChange={setValue}
        />
      </Animated.View>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s,
  },
  text: {
    lineHeight: 22,
    paddingRight: spacing.lg,
  },
  slider: {
    overflow: 'hidden',
    justifyContent: 'center',
    paddingLeft: spacing.m,
    marginLeft: -spacing.m,
    paddingRight: spacing.m,
  }
})