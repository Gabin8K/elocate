import { useTheme } from '@/hooks';
import React, { FC, PropsWithChildren, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Modal, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';


type ModalConfig = {
  top: number;
  offsetHeight: number;
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
  offsetHeight: 100,
  velocityHeight: 1500,
  animationDuration: 400
}


const AnimatedTouchablePressable = Animated.createAnimatedComponent(Pressable);
const { height } = Dimensions.get('window');


export const ModalSheet: FC<ModalSheetProps> = memo(function ModalSheet(props) {
  const { open, onClose, children, containerStyle, style, ...rest } = props;

  const config: ModalConfig = {
    top: rest.config?.top ?? defaultConfig.top,
    offsetHeight: rest.config?.offsetHeight ?? defaultConfig.offsetHeight,
    velocityHeight: rest.config?.velocityHeight ?? defaultConfig.velocityHeight,
    animationDuration: rest.config?.animationDuration ?? defaultConfig.animationDuration
  }

  const { colors } = useTheme();
  const [show, setShow] = useState(open);

  const translateY = useSharedValue(height);

  const gestureHandler = useMemo(() => {
    return (
      Gesture
        .Pan()
        .activeOffsetY([-20, 20])
        .onChange(e => {
          const y = Math.abs(e.translationY);
          if (y <= config.offsetHeight) {
            translateY.value = e.translationY;
          }
        })
        .onEnd(e => {
          if (e.velocityY > config.velocityHeight && onClose) {
            translateY.value = withTiming(height, { duration: config.animationDuration }, (finished) => {
              if (finished) {
                runOnJS(onClose)();
                runOnJS(setShow)(false);
              };
            });
          } else {
            translateY.value = withSpring(0, { damping: 10 });
          }
        })
    )
  }, [onClose]);


  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value + config.top }
      ]
    }
  }, []);

  const uasBackground = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [0, height], [.4, 0], 'clamp')
    }
  }, [height])

  const onRequestClose = useCallback(() => {
    translateY.value = withTiming(height, { duration: config.animationDuration }, (finished) => {
      if (finished && onClose) {
        runOnJS(onClose)();
        runOnJS(setShow)(false);
      };
    });
  }, []);


  useEffect(() => {
    if (open && translateY.value === height) {
      setShow(true);
      translateY.value = withSpring(0, { damping: 20 });
    } else if (!open) {
      translateY.value = withTiming(height, { duration: config.animationDuration }, (finished) => {
        if (finished && onClose) {
          runOnJS(onClose)();
          runOnJS(setShow)(false);
        };
      });
    }
  }, [open]);


  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={show}
      onRequestClose={onRequestClose}
      animationType={'none'}
    >
      <GestureHandlerRootView
        style={[
          styles.gesture,
          style,
          styles.flex
        ]}
      >
        {typeof onClose === 'function' ?
          <AnimatedTouchablePressable
            onPress={onRequestClose}
            style={[
              uasBackground,
              styles.clickAwayListener,
              { backgroundColor: colors.text }
            ]}
          /> :
          null
        }
        <GestureDetector
          gesture={gestureHandler}
        >
          <Animated.View
            style={[
              uas,
              containerStyle
            ]}
          >
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  )
});


const styles = StyleSheet.create({
  clickAwayListener: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  gesture: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1
  }
});