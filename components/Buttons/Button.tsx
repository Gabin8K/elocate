import { Text } from '../ui';
import { useTheme } from '@/hooks';
import { Theme } from '@/theme';
import { spacing } from '@/theme/spacing';
import React, { memo, ReactNode } from 'react';
import { component, reusableStyle } from '@/theme/reusables';
import { Pressable, PressableProps } from 'react-native-gesture-handler';
import { ActivityIndicator, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface ButtonProps extends PressableProps {
  loading?: boolean;
  variant?: keyof Theme['colors'];
  colorIndicator?: keyof Theme['colors'];
  colorDisabled?: keyof Theme['colors'];
  full?: boolean;
  endIcon?: ReactNode;
  starIcon?: ReactNode;
  textStyle?: React.ComponentProps<typeof Text>;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  layout?: boolean
}



export const Button = memo<ButtonProps>(function Button({ style: _style, ...props }) {
  const { textStyle, loading, disabled, variant = 'primary', colorDisabled = 'disabled', colorIndicator, full, layout, ...rest } = props;
  const { colors } = useTheme();
  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(active.value ? .98 : 1) }],
    backgroundColor: withTiming(loading || disabled ? colors[colorDisabled] : colors[variant]),
  }), [loading, disabled, colorDisabled, variant]);

  return (
    <Animated.View
      layout={layout ? LinearTransition : undefined}
      style={_style}
    >
      <Pressable
        onPressIn={() => (active.value = true)}
        onPressOut={() => (active.value = false)}
        disabled={loading || disabled}
        {...rest}
      >
        <Animated.View
          style={[
            styles.container,
            { shadowColor: colors.shadow },
            full ? { width: '100%' } : {},
            uas
          ]}
        >
          {loading ?
            <ActivityIndicator
              animating
              color={colors[colorIndicator ?? variant]}
              style={styles.indicator}
            /> :
            null
          }
          {props.starIcon}
          <Text
            color={'gray1'}
            variant={'body2_eb'}
            {...textStyle}
          >
            {props.children}
          </Text>
          {props.endIcon}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
})

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.s,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
    justifyContent: 'center',
    columnGap: spacing.s,
    ...reusableStyle.row,
    ...component.shadow
  },
  indicator: {
    position: 'absolute',
    zIndex: 2
  }
})