import { FC, memo, useEffect, useMemo } from "react";
import Animated, { Easing, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Portal } from "@/providers/PortalProvider";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { useTheme } from "@/hooks";
import { component } from "@/theme/reusables";
import { useDrawer } from "./DrawerProvider";
import { palette } from "@/theme/palette";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DrawerContent } from "./DrawerContent";
import useBackhandler from "@/hooks/useBackhandler";

const height = spacing.height * 0.7;
const width = spacing.width * 0.75;
const right = spacing.s;

const velocity = 300;
const duration = 400;
const easing = Easing.in(Easing.bezierFn(0.25, 0.1, 0, 1.02))



export const DrawerLayout: FC = memo(function DrawerLayout() {

  const { colors } = useTheme();
  const { open, setOpen } = useDrawer();

  const translateX = useSharedValue(0);

  const gesture = useMemo(() => Gesture.Pan()
    .onChange(e => {
      if (e.translationX >= 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(e => {
      if (Math.abs(e.velocityY) > velocity) {
        translateX.value = withTiming(height, { duration }, (finished) => {
          if (finished) {
            runOnJS(setOpen)(false);
          };
        });
      } else {
        translateX.value = withTiming(0);
      }
    }), [setOpen]);


  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value }
      ]
    }
  }, []);


  const uasSwip = useAnimatedStyle(() => {
    return {
      transform: [
        { scaleY: interpolate(translateX.value, [0, width], [1, 2]) }
      ]
    }
  }, []);


  const uasBackground = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(translateX.value, [0, width], ['rgba(0,0,0,.5)', 'rgba(0,0,0,0)']);
    return {
      backgroundColor,
    }
  }, []);


  useBackhandler(() => {
    if (open) {
      setOpen(false);
      return true;
    }
    return false;
  });


  useEffect(() => {
    if (open && translateX.value !== 0) {
      translateX.value = withTiming(0, { duration, easing });
    } else if (!open) {
      translateX.value = withTiming(width + right, { duration });
    }
  }, [open])



  return (
    <Portal
      name={'drawer'}
    >
      {open ?
        <Animated.View
          style={[
            uasBackground,
            styles.full,
          ]}
        /> :
        null
      }
      <GestureDetector
        gesture={gesture}
      >
        <Animated.View
          style={[
            uas,
            styles.container,
            { backgroundColor: colors.background, },
          ]}
        >
          <Animated.View
            style={[
              uasSwip,
              styles.swip,
            ]}
          />
          <DrawerContent />
        </Animated.View>
      </GestureDetector>
    </Portal>
  );
})


const styles = StyleSheet.create({
  full: {
    zIndex: 1,
    position: 'absolute',
    width: spacing.width,
    height: spacing.height * 1.1,
  },
  container: {
    zIndex: 9,
    position: 'absolute',
    width,
    height,
    right,
    borderTopStartRadius: spacing.m,
    borderBottomStartRadius: spacing.m,
    bottom: 80,
    ...component.shadow,
  },
  swip: {
    zIndex: 1,
    top: height / 2 - 15,
    position: 'absolute',
    left: 3,
    height: 30,
    width: 4,
    borderRadius: 4,
    backgroundColor: palette.light.gray2
  }
})