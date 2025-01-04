import { useTheme } from '@/hooks';
import useBackhandler from '@/hooks/useBackhandler';
import { Portal } from '@/providers/PortalProvider';
import { palette } from '@/theme/palette';
import { component } from '@/theme/reusables';
import { spacing } from '@/theme/spacing';
import React, { FC, PropsWithChildren, memo, useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, interpolate, LinearTransition, ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


type ModalConfig = {
  top: number;
  velocityHeight: number;
  animationDuration: number;
}

interface ModalSheetProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
  config?: ModalConfig;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}


const defaultConfig: ModalConfig = {
  top: 0,
  velocityHeight: 1200,
  animationDuration: 400
}


const height = spacing.height;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ModalSheet: FC<ModalSheetProps> = (props: ModalSheetProps) => {
  const { open } = props;

  return (
    <Portal
      name={'modal-sheet'}
    >
      {open ?
        <RenderModalSheet {...props} /> :
        null
      }
    </Portal>
  );
}


const RenderModalSheet: FC<ModalSheetProps> = memo(function RenderModalSheet(props) {
  const { open, onClose, children, containerStyle, style, ...rest } = props;

  const config: ModalConfig = {
    top: rest.config?.top ?? defaultConfig.top,
    velocityHeight: rest.config?.velocityHeight ?? defaultConfig.velocityHeight,
    animationDuration: rest.config?.animationDuration ?? defaultConfig.animationDuration
  }

  const { colors } = useTheme();

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
      backgroundColor: colors.text,
      opacity: interpolate(translateY.value, [0, height], [.4, 0], 'clamp')
    }
  }, [height, colors]);


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


  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 800,
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
            ]}
          />
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  )
});



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
    backgroundColor: palette.light.gray2,
  },
  pressable: {
    ...StyleSheet.absoluteFillObject,
  }
});