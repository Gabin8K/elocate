import React, { memo } from 'react';
import { common } from '@/theme/palette';
import { Pressable, PressableProps, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const AnimatedTouchale = Animated.createAnimatedComponent(Pressable);


export const ButtonTab = memo<PressableProps>(function ButtonTab(props) {
  const { style, ...rest } = props;

  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(active.value ? 1.2 : 1) }],
  }), []);

  return (
    <AnimatedTouchale
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      style={[
        uas,
        styles.container,
        style
      ]}
      {...rest}
    >
      {props.children}
    </AnimatedTouchale>
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: common.transparent,
  }
})
