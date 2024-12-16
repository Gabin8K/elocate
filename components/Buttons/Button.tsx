import React, { memo, ReactNode } from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Text } from '../ui';
import { useTheme } from '@/hooks';
import { Theme } from '@/theme';
import { component } from '@/theme/reusables';
import { spacing } from '@/theme/spacing';

export interface ButtonProps extends PressableProps {
  loading?: boolean;
  variant?: keyof Theme['colors'];
  colorIndicator?: keyof Theme['colors'];
  colorDisabled?: keyof Theme['colors'];
  full?: boolean;
  textStyle?: React.ComponentProps<typeof Text>;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  layout?: boolean
}


const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


export const Button = memo<ButtonProps>(function Button({ style: _style, ...props }) {
  const { textStyle, loading, disabled, variant = 'primary', colorDisabled = 'disabled', colorIndicator, full, layout, ...rest } = props;
  const { colors } = useTheme();
  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(active.value ? .98 : 1) }],
    backgroundColor: withTiming(loading || disabled ? colors[colorDisabled] : colors[variant]),
  }), [loading, disabled, colorDisabled, variant]);

  return (
    <AnimatedPressable
      layout={layout ? LinearTransition : undefined}
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      disabled={loading || disabled}
      style={[
        styles.container,
        { shadowColor: colors.shadow },
        _style,
        full ? { width: '100%' } : {},
        uas
      ]}
      {...rest}
    >
      {loading ?
        <ActivityIndicator
          animating
          color={colors[colorIndicator ?? variant]}
          style={styles.indicator}
        /> :
        null
      }
      <Text
        color={'gray1'}
        variant={'body2_eb'}
        {...textStyle}
      >
        {props.children}
      </Text>

    </AnimatedPressable>
  );
})

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    ...component.shadow
  },
  indicator: {
    position: 'absolute',
    zIndex: 2
  }
})