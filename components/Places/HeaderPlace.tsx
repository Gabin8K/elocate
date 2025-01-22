import { Text } from "../ui";
import { useLocale } from "@/hooks";
import { Slider } from "../ui/slider";
import { spacing } from "@/theme/spacing";
import { FC, memo, useState } from "react";
import { HeaderChild } from "../layout/header";
import { StyleSheet, View } from "react-native";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";


export const HeaderPlace: FC = memo(function HeaderPlace() {
  return (
    <HeaderChild>
      <HeaderPlaceContent />
    </HeaderChild>
  )
})



const HeaderPlaceContent: FC = memo(function HeaderPlaceContent() {

  const { t } = useLocale();

  const { offsetY } = useScrollAnimated();
  const [value, setValue] = useState(0);

  const km = Math.floor(value / 5);

  const uas = useAnimatedStyle(() => {
    const height = interpolate(offsetY.value, [0, 100], [spacing.l + spacing.m, 0], 'clamp');
    const opacity = interpolate(offsetY.value, [0, 50], [1, 0], 'clamp');

    return {
      height,
      opacity,
    }
  }, []);


  return (
    <View
      style={styles.container}
    >
      <View>
        <Text
          style={styles.text}
        >
          {t('slider-showing')}:{' '}
          <Text
            variant={'body2_b'}
            color={'primary'}
          >
            0 {t('slider-showing-end')}
          </Text>
        </Text>
        <Text>
          {t('slider-within')}:{' '}
          <Text
            variant={'body2_b'}
            color={'primary'}
          >
            {km} {t('slider-km')}
          </Text>
        </Text>
      </View>
      <Animated.View
        style={[
          uas,
          styles.slider,
        ]}
      >
        <Slider
          onChange={setValue}
        />
      </Animated.View>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s,
  },
  text: {
    lineHeight: 22,
    paddingRight: spacing.lg,
  },
  slider: {
    overflow: 'hidden',
    paddingLeft: spacing.m,
    marginLeft: -spacing.m,
    paddingRight: spacing.m,
    justifyContent: 'center',
    width: spacing.width * .7,
  }
})