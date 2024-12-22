import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/theme';
import React, { FC, memo } from 'react'
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';


type Props = PressableProps & {
  Icon?: FC<SvgProps>;
  iconProps?: SvgProps;
  variant?: keyof Theme['colors'];
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  loading?: boolean;
  layout?: boolean;
}


export const IconButton = memo(function IconButton(props: Props) {
  const { Icon = null, iconProps, loading, styleContainer, variant = 'primary', style: _style, layout, ...rest } = props;

  const { colors } = useTheme();
  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(loading ? colors.disabled : colors['transparent']),
    transform: [{ scale: withTiming(active.value ? .98 : 1) }],
  }), [loading]);

  return (
    <Animated.View
      layout={layout ? LinearTransition : undefined}
      style={[uas, styles.overflow, styleContainer]}
    >
      <Pressable
        onPressIn={() => (active.value = true)}
        onPressOut={() => (active.value = false)}
        disabled={loading}
        android_ripple={{
          color: colors.primary_light,
          radius: 100
        }}
        style={[styles.container, _style]}
        {...rest}
      >
        {Icon ?
          <Icon
            color={colors[loading ? 'disabled' : variant]}
            {...iconProps}
          /> :
          null
        }
      </Pressable>
    </Animated.View>
  )
});

const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden',
    borderRadius: 35,
    width: 35,
    height: 35,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})