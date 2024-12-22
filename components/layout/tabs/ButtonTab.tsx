import React, { memo } from 'react';
import { Pressable, PressableProps, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { palette } from '@/theme/palette';


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
        styles.conteiner,
        style
      ]}
      {...rest}
    >
      {props.children}
    </AnimatedTouchale>
  );
});


const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: palette.common.transparent,
  }
})
