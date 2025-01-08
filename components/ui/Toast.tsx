import React, { FC, memo, useEffect } from 'react'
import Animated, { Easing, SlideInUp, SlideOutUp } from 'react-native-reanimated'
import { StyleSheet } from 'react-native';
import { useToast } from '@/hooks/useToast';
import { spacing } from '@/theme/spacing';
import { Text } from './Text';
import { component } from '@/theme/reusables';
import { useTheme } from '@/hooks';



const Toast: FC = memo(function Toast() {

  const { state, cancel } = useToast();
  const { colors, mode } = useTheme();

  useEffect(() => {
    const subscribe = setTimeout(() => cancel(), 5000);
    return () => clearTimeout(subscribe);
  }, [state.message])

  return (
    <Animated.View
      entering={
        SlideInUp
          .springify()
          .damping(50)
      }
      exiting={
        SlideOutUp
          .duration(1000)
          .easing(Easing.ease)
      }
      style={[
        styles.toast,
        { backgroundColor: mode === 'light' ? colors.background : colors.card }
      ]}
    >
      <Text
        variant={'body2_m'}
        color={state.color}
      >
        {state.message}
      </Text>
    </Animated.View>
  )
})



export const Toaster: FC = memo(function Toaster() {
  const toast = useToast();

  if (!toast.state.message) {
    return null;
  }

  return <Toast />
})



const styles = StyleSheet.create({
  toast: {
    zIndex: 100,
    top: spacing.xl,
    left: spacing.m,
    right: spacing.m,
    ...component.shadow,
    position: 'absolute',
    borderRadius: spacing.s,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
  }
})