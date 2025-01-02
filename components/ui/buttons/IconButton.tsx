import React, { memo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, PressableProps } from 'react-native-gesture-handler';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


type Props = PressableProps & {
  icon?: keyof typeof Ionicons.glyphMap;
  iconProps?: Partial<React.ComponentProps<typeof Ionicons>>;
  variant?: keyof Theme['colors'];
  backgroundColor?: keyof Theme['colors'];
  shadow?: boolean;
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  loading?: boolean;
  layout?: boolean;
}


export const IconButton = memo(function IconButton(props: Props) {
  const {
    children, icon, iconProps, shadow, loading, styleContainer, variant = 'text',
    backgroundColor = 'transparent', style: _style, layout, ...rest
  } = props;

  const { colors } = useTheme();
  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(loading ? colors.disabled : colors[backgroundColor]),
    transform: [{ scale: withTiming(active.value ? .97 : 1) }],
  }), [loading, backgroundColor]);

  return (
    <Animated.View
      layout={layout ? LinearTransition : undefined}
      style={[
        uas,
        styles.overflow,
        styleContainer,
        { boxShadow: shadow ? `0 4 4 ${colors.shadow}, 0 -4 4 ${colors.shadow}` : undefined },
      ]}
    >
      <Pressable
        unstable_pressDelay={100}
        onPressIn={() => (active.value = true)}
        onPressOut={() => (active.value = false)}
        disabled={loading}
        android_ripple={{
          color: colors.gray2,
          radius: 100
        }}
        {...rest}
      >
        <Animated.View
          style={[styles.container, _style]}
        >
          {icon ?
            <Ionicons
              color={colors[loading ? 'disabled' : variant]}
              size={24}
              name={icon}
              {...iconProps}
            /> :
            children as any
          }
        </Animated.View>
      </Pressable>
    </Animated.View>
  )
});

const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden',
    borderRadius: 40,
    width: 40,
    height: 40,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})