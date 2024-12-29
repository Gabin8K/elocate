import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import { memo, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";


export const ripples = Array.from({ length: 2 }, (_, i) => i);


export const PointRipple = memo(function PointRipple({ index }: { index: number }) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const uas = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
      ]
    }
  }, []);


  useEffect(() => {
    scale.value = withDelay(index * 500, withRepeat(withTiming(1.4, { duration: 1000 }), -1, false));
    opacity.value = withDelay(index * 500, withRepeat(withTiming(0, { duration: 1000 }), -1, false));
  }, [])

  return (
    <Animated.View
      style={[
        styles.rounded,
        uas
      ]}
    />
  )
});


const styles = StyleSheet.create({
  rounded: {
    position: 'absolute',
    width: spacing.l,
    height: spacing.l,
    borderRadius: spacing.l,
    backgroundColor: palette.light.primary,
  }
})
