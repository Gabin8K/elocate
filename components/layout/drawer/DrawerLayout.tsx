import { FC, Fragment, memo, useCallback, useEffect, useMemo } from "react";
import Animated, { Easing, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Portal } from "@/providers/PortalProvider";
import { StyleSheet, Pressable } from "react-native";
import { spacing } from "@/theme/spacing";
import { useTheme } from "@/hooks";
import { component } from "@/theme/reusables";
import { useDrawer } from "./DrawerProvider";
import { palette } from "@/theme/palette";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DrawerContent } from "./DrawerContent";
import useBackhandler from "@/hooks/useBackhandler";


type ContentProps = {
  setOpen: (open: boolean) => void;
}


const height = spacing.height * 0.7;
const width = spacing.width * 0.75;
const right = 0;

const velocity = 300;
const duration = 400;
const easing = Easing.in(Easing.bezierFn(0.25, 0.1, 0, 1.02))


const AnimatedPressble = Animated.createAnimatedComponent(Pressable);



export const DrawerLayout: FC = memo(function DrawerLayout() {
  const { open, setOpen } = useDrawer();
  return (
    <Portal
      name={'drawer'}
    >
      {open ?
        <DrawerLayoutContent
          setOpen={setOpen}
        /> :
        null
      }
    </Portal>
  )
});





export const DrawerLayoutContent: FC<ContentProps> = memo(function DrawerLayoutContent(props) {
  const { setOpen } = props;

  const { colors } = useTheme();

  const translateX = useSharedValue(width + right);

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
        { scaleY: interpolate(translateX.value, [0, width], [1, 2.5]) }
      ]
    }
  }, []);


  const uasBackground = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(translateX.value, [0, width], ['rgba(0,0,0,.5)', 'rgba(0,0,0,0)']);
    return {
      backgroundColor,
    }
  }, []);


  const onClose = useCallback(() => {
    translateX.value = withTiming(width + right, { duration, easing }, (finished) => {
      if (finished) {
        runOnJS(setOpen)(false);
      }
    });
  }, []);


  useBackhandler(() => {
    setOpen(false);
    return true;
  });


  useEffect(() => {
    translateX.value = withTiming(0, { duration, easing });
  }, []);



  return (
    <Fragment>
      <AnimatedPressble
        onPress={onClose}
        style={[
          uasBackground,
          styles.full,
        ]}
      />
      <GestureDetector
        gesture={gesture}
      >
        <Animated.View
          style={[
            uas,
            styles.container,
            { backgroundColor: colors.card, },
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
    </Fragment>
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
    bottom: spacing.xl * 2,
    borderTopStartRadius: spacing.m,
    borderBottomStartRadius: spacing.m,
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