import { FC, memo, useEffect } from "react";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Portal } from "@/providers/PortalProvider";
import { StyleSheet, View } from "react-native";
import { spacing } from "@/theme/spacing";
import { useTheme } from "@/hooks";
import { component } from "@/theme/reusables";
import { useDrawer } from "./DrawerProvider";
import { palette } from "@/theme/palette";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DrawerContent } from "./DrawerContent";

const height = spacing.height * 0.7;
const width = spacing.width * 0.75;
const right = spacing.width / 3 - (spacing.width / 3) / 2;

const velocity = 300;
const duration = 500;

const originX = spacing.width;

const enteringAnim = (args: any) => {
  'worklet';
  const animations = {
    originX: withTiming(args.targetOriginX, { duration, easing: Easing.in(Easing.bezierFn(0.25, 0.1, 0, 1.02)) }),
  }
  const initialValues = {
    originX,
  }
  return {
    animations,
    initialValues
  }
}



export const DrawerLayout: FC = memo(function DrawerLayout() {

  const { colors } = useTheme();
  const { open, setOpen } = useDrawer();

  const translateX = useSharedValue(0);

  const gesture = Gesture.Pan()
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
    });


  const uas = useAnimatedStyle(() => {
    return {
      zIndex: 99,
      transform: [
        { translateX: translateX.value }
      ]
    }
  });


  useEffect(() => {
    if (open && translateX.value !== 0) {
      translateX.value = withTiming(0, { duration });
    }
  }, [open])


  if (!open) return null;


  return (
    <Portal
      name={'drawer'}
    >
      <GestureDetector
        gesture={gesture}
      >
        <Animated.View
          entering={enteringAnim}
          style={[
            styles.container,
            { backgroundColor: colors.background },
            uas,
          ]}
        >
          <View
            style={styles.swip}
          />
          <DrawerContent />
        </Animated.View>
      </GestureDetector>
    </Portal>
  );
})


const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    position: 'absolute',
    padding: spacing.m,
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