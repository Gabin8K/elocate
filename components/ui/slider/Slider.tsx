import { useTheme } from "@/hooks";
import { common } from "@/theme/palette";
import { reusableStyle } from "@/theme/reusables";
import { FC, memo, useCallback, useMemo } from "react";
import { LayoutChangeEvent, StyleSheet, Vibration, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export interface SliderProps {
  onChange?: (value: number) => void;
}

const trackSize = 20;
const trackLeft = trackSize / 2;
const trackBorderWidth = 1.5;
const trackOffsetX = (trackSize - trackBorderWidth) / 2;



export const Slider: FC<SliderProps> = memo(function Slider(props) {
  const { onChange } = props;

  const { colors } = useTheme();

  const translateX = useSharedValue(0);
  const offsetX = useSharedValue(-trackOffsetX);
  const size = useSharedValue(0);


  const gesture = useMemo(() => {
    return (
      Gesture.Pan()
        .onChange(e => {

          const x = e.translationX + offsetX.value;
          const value = Math.ceil(x / size.value * 100);

          if (x >= 0 && x <= size.value) {
            translateX.value = x;
            if (value % 5 === 0) {
              runOnJS(Vibration.vibrate)(10);
            }
          }
        })
        .onEnd(() => {
          offsetX.value = translateX.value;
        })
        .onFinalize(() => {
          if (onChange) {
            const value = Math.ceil(translateX.value / size.value * 100);
            runOnJS(onChange)(value);
          }
        })
    )
  }, [onChange]);


  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    }
  }, []);


  const uasThumb = useAnimatedStyle(() => {
    const width = interpolate(translateX.value, [0, size.value], [0, size.value]);
    return {
      width
    }
  }, []);


  const onLayout = useCallback(({ target }: LayoutChangeEvent) => {
    target.measure((x, y, width, height, pageX, pageY) => {
      size.value = width;
    });
  }, []);


  return (
    <View
      onLayout={onLayout}
      style={styles.container}
    >
      <Animated.View
        style={[
          uasThumb,
          styles.thumb,
          { backgroundColor: colors.primary }
        ]}
      />
      <GestureDetector
        gesture={gesture}
      >
        <Animated.View
          style={[
            uas,
            styles.track,
            {
              borderColor: colors.primary,
              boxShadow: `0 4 4 ${colors.shadow}, 0 -4 4 ${colors.shadow}`,
            }
          ]}
        />
      </GestureDetector>
    </View>
  )
});


const styles = StyleSheet.create({
  container: {
    height: 4,
    width: '100%',
    borderRadius: 4,
    ...reusableStyle.row,
    backgroundColor: common.disabled,
  },
  thumb: {
    height: '100%',
    borderTopStartRadius: 4,
    borderBottomStartRadius: 4,
  },
  track: {
    left: -trackLeft,
    width: trackSize,
    height: trackSize,
    borderWidth: trackBorderWidth,
    position: 'absolute',
    borderRadius: trackSize,
    backgroundColor: common.gray1,
  }
})