import React, { FC, memo, useEffect } from 'react'
import Animated, { Easing, SlideInRight, SlideOutRight } from 'react-native-reanimated'
import { StyleSheet } from 'react-native';
import { Text } from './Text';
import { useToast } from '@/hooks';
import { spacing } from '@/theme/spacing';




const Toast: FC = memo(function Toast() {
  const { state, cancel } = useToast();

  useEffect(() => {
    const subscribe = setTimeout(() => cancel(), 5000);
    return () => clearTimeout(subscribe);
  }, [state.message])

  return (
    <Animated.View
      entering={
        SlideInRight
          .springify()
          .damping(50)
      }
      exiting={
        SlideOutRight
          .duration(1000)
          .easing(Easing.ease)
      }
      style={styles.toast}
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
    zIndex: 10000,
    top: 250,
    right: spacing.m,
    width: 800,
    position: 'absolute',
    borderRadius: spacing.l,
    flexDirection: 'row',
  }
})