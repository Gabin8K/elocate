import { useTheme } from '@/hooks/useTheme';
import { Theme } from '@/theme';
import React, { memo } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


type Props = PressableProps & {
  name?: keyof typeof Ionicons.glyphMap;
  variant?: keyof Theme['colors'];
  style?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  loading?: boolean;
  layout?: boolean;
}


export const IconButton = memo(function IconButton(props: Props) {
  const { name = 'locate', loading, styleContainer, variant = 'primary', style: _style, layout, ...rest } = props;

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
          color: colors.ripple,
          radius: 100
        }}
        style={[styles.container, _style]}
        {...rest}
      >
        <Ionicons
          name={name}
          size={24}
          color={colors[loading ? 'disabled' : variant]}
        />
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