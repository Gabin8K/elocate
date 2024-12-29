import { useTheme } from '@/hooks';
import { Portal } from '@/providers/PortalProvider';
import { palette } from '@/theme/palette';
import { component } from '@/theme/reusables';
import { spacing } from '@/theme/spacing';
import React, { FC, PropsWithChildren, memo, useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, interpolate, ReduceMotion, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


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
  const { onClose, children, containerStyle, style, ...rest } = props;

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



  const onRequestClose = useCallback(() => {
    translateY.value = withTiming(height, { duration: config.animationDuration }, (finished) => {
      if (finished && onClose) {
        runOnJS(onClose)();
      };
    });
  }, [onClose])


  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    });
  }, [])



  return (
    <GestureDetector
      gesture={gestureHandler}
    >
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
        <Animated.View
          style={[
            uas,
            styles.container,
            containerStyle,
          ]}
        >
          <View
            style={styles.swip}
          />
          {children}
        </Animated.View>
      </View>
    </GestureDetector>
  )
});



const styles = StyleSheet.create({
  full: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    width: spacing.width,
    padding: spacing.m,
    paddingHorizontal: spacing.s,
    borderTopLeftRadius: spacing.m,
    borderTopRightRadius: spacing.m,
    ...component.shadow,
  },
  swip: {
    zIndex: 1,
    position: 'absolute',
    top: spacing.s,
    left: spacing.width / 2 - 15,
    width: 30,
    height: 4,
    borderRadius: 4,
    backgroundColor: palette.light.gray2,
  },
  pressable: {
    ...StyleSheet.absoluteFillObject,
  }
});