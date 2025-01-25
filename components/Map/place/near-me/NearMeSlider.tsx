import { useLocale } from "@/hooks";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { StyleSheet, View } from "react-native";
import { Slider } from "@/components/ui/slider";
import { FC, memo, useCallback, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";


type NearMeSliderProps = {
  onRadiusChange: (value: number) => void;
}



export const NearMeSlider: FC<NearMeSliderProps> = memo(function NearMeSlider(props) {
  const { onRadiusChange } = props;

  const { t } = useLocale();

  const [value, setValue] = useState(0);
  const km = Math.floor(value / 5);

  const onChange = useCallback((value: number) => {
    setValue(value);
    onRadiusChange(value);
  }, [onRadiusChange]);


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
        onChange={onChange}
      />
    </Animated.View>
  );
});



const styles = StyleSheet.create({
  container: {
    rowGap: spacing.l,
    padding: spacing.l,
    minWidth: spacing.width * 0.65,
  },
  text: {
    lineHeight: 22,
    paddingRight: spacing.lg,
  }
})