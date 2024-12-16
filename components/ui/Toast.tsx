import React, { FC, memo, useEffect } from 'react'
import Animated, { Easing, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { StyleSheet } from 'react-native';
import { useToast } from '@/hooks/useToast';
import { spacing } from '@/theme/spacing';
import { Text } from './Text';
import { component } from '@/theme/reusables';
import { useTheme } from '@/hooks';



const Toast: FC = memo(function Toast() {

  const { state, cancel } = useToast();
  const { colors } = useTheme();

  useEffect(() => {
    const subscribe = setTimeout(() => cancel(), 5000);
    return () => clearTimeout(subscribe);
  }, [state.message])

  return (
    <Animated.View
      entering={
        SlideInDown
          .springify()
          .damping(50)
      }
      exiting={
        SlideOutDown
          .duration(1000)
          .easing(Easing.ease)
      }
      style={[
        styles.toast,
        { backgroundColor: colors.background }
      ]}
    >
      <Text
        variant={'body1_m'}
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
    left: spacing.m,
    right: spacing.m,
    bottom: spacing.l,
    padding:spacing.s,
    ...component.shadow,
    position: 'absolute',
    borderRadius: spacing.s,
  }
})