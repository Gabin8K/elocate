import { spacing } from '@/theme/spacing';
import { component } from '@/theme/reusables';
import { useTheme, useBackhandler } from '@/hooks';
import { Portal } from '@/providers/PortalProvider';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React, { PropsWithChildren, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import Animated, { Easing, interpolate, LinearTransition, ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


type ModalConfig = {
  top: number;
  velocityHeight: number;
  enteringDuration?: number;
  animationDuration: number;
}


export type ModalSheetRef = {
  close?: () => void;
}


export interface ModalSheetProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
  config?: Partial<ModalConfig>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}


const defaultConfig: ModalConfig = {
  top: 0,
  enteringDuration: 1000,
  velocityHeight: 1200,
  animationDuration: 400,
}


const height = spacing.height;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ModalSheet = forwardRef<ModalSheetRef, ModalSheetProps>(function ModalSheet(props, ref) {
  const { open } = props;

  return (
    <Portal
      name={'modal-sheet'}
    >
      {open ?
        <RenderModalSheet
          ref={ref}
          {...props}
        /> :
        null
      }
    </Portal>
  );
})


const RenderModalSheet = memo(forwardRef<ModalSheetRef, ModalSheetProps>(function RenderModalSheet(props, ref) {
  const { open, onClose, children, containerStyle, style, ...rest } = props;

  const config: ModalConfig = {
    top: rest.config?.top ?? defaultConfig.top,
    velocityHeight: rest.config?.velocityHeight ?? defaultConfig.velocityHeight,
    enteringDuration: rest.config?.enteringDuration ?? defaultConfig.enteringDuration,
    animationDuration: rest.config?.animationDuration ?? defaultConfig.animationDuration
  }

  const { colors, mode } = useTheme();

  const translateY = useSharedValue(height);

  const gestureHandler = useMemo(() => {
    return (
      Gesture
        .Pan()
        .onChange(e => {
          if (e.translationY >= 0) {
            translateY.value = e.translationY;
          }
        })
        .onEnd(e => {
          if (e.velocityY > config.velocityHeight && onClose) {
            translateY.value = withTiming(height, { duration: config.animationDuration }, (finished) => {
              if (finished) {
                runOnJS(onClose)();
              };
            });
          } else {
            translateY.value = withTiming(0, { duration: config.animationDuration });
          }
        })
    )
  }, [onClose]);


  const uas = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.card,
      transform: [
        { translateY: translateY.value + config.top }
      ]
    }
  }, [colors]);


  const uasBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.gray5,
      opacity: interpolate(translateY.value, [0, height], [.4, 0], 'clamp')
    }
  }, [height]);


  const uasSwip = useAnimatedStyle(() => {
    return {
      transform: [
        { scaleX: interpolate(translateY.value, [0, height], [1, 2.5]) }
      ]
    }
  }, []);


  const onRequestClose = useCallback(() => {
    translateY.value = withTiming(height, { duration: config.animationDuration }, (finished) => {
      if (finished && onClose) {
        runOnJS(onClose)();
      };
    });
  }, [onClose])



  useBackhandler(() => {
    if (open) {
      onRequestClose();
      return true;
    }
    return false;
  })


  useImperativeHandle(ref, () => {
    return {
      close: onRequestClose
    }
  }, [onClose]);


  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: config.enteringDuration,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, [])



  return (
    <View
      style={styles.full}
    >
      <AnimatedPressable
        onPress={onRequestClose}
        style={[
          uasBackground,
          styles.pressable,
        ]}
      />
      <GestureDetector
        gesture={gestureHandler}
      >
        <Animated.View
          layout={LinearTransition}
          style={[
            uas,
            styles.container,
            containerStyle,
          ]}
        >
          <Animated.View
            style={[
              uasSwip,
              styles.swip,
              { backgroundColor: mode === 'light' ? colors.gray2 : colors.gray4 }
            ]}
          />
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}));



const styles = StyleSheet.create({
  full: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    zIndex: 2,
    position: 'absolute',
    bottom: spacing.m,
    ...component.shadow,
    alignSelf: 'center',
    borderRadius: spacing.m,
    width: spacing.width * .97,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
  },
  swip: {
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: spacing.s,
    width: 30,
    height: 4,
    borderRadius: 4,
  },
  pressable: {
    ...StyleSheet.absoluteFillObject,
  }
});