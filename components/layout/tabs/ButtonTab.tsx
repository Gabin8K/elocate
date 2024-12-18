import React, { memo } from 'react';
import { useTheme } from '@/hooks';
import { Pressable, PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const AnimatedTouchale = Animated.createAnimatedComponent(Pressable);


export const ButtonTab = memo<PressableProps>(function ButtonTab(props) {
  const { style, ...rest } = props;

  const { colors } = useTheme();
  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => ({
    flex: 1,
    alignItems: 'center',
    transform: [{ scale: withTiming(active.value ? 1.2 : 1) }],
  }), []);

  return (
    <AnimatedTouchale
      android_ripple={{
        radius: 20,
        borderless: true,
        color: colors.primary_light,
      }}
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      style={[
        uas,
        style
      ]}
      {...rest}
    >
      {props.children}
    </AnimatedTouchale>
  );
});
