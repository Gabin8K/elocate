import { useLocale } from "@/hooks";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { FC, memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Slider } from "@/components/ui/slider";
import Animated, { FadeIn } from "react-native-reanimated";



export const NearMeSlider: FC = memo(function NearMeSlider() {
  const { t } = useLocale();

  const [value, setValue] = useState(0);
  const km = Math.floor(value / 5);


  return (
    <Animated.View
      entering={FadeIn.delay(200)}
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
      <Slider
        onChange={setValue}
      />
    </Animated.View>
  );
});



const styles = StyleSheet.create({
  container: {
    rowGap: spacing.l,
    padding: spacing.l,
  },
  text: {
    lineHeight: 22,
    paddingRight: spacing.lg,
  }
})