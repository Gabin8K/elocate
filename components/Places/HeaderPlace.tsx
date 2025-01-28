import { Text } from "../ui";
import { useLocale } from "@/hooks";
import { Slider } from "../ui/slider";
import { spacing } from "@/theme/spacing";
import { usePlaces } from "./PlacesContext";
import { HeaderChild } from "../layout/header";
import { StyleSheet, View } from "react-native";
import { FC, memo, useCallback, useState } from "react";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";


type ContentProps = {
  loading?: boolean;
  placesSize: number;
  defaultValue: number;
  onRadiusChange: (value: number) => void;
}



export const HeaderPlace: FC = memo(function HeaderPlace() {
  const places = usePlaces();

  return (
    <HeaderChild>
      <HeaderPlaceContent
        defaultValue={2}
        loading={places.loading}
        placesSize={places.listOfPlaces.length}
        onRadiusChange={places.onRadiusChange}
      />
    </HeaderChild>
  )
});




const HeaderPlaceContent: FC<ContentProps> = memo(function HeaderPlaceContent(props) {
  const { loading, defaultValue, placesSize, onRadiusChange } = props;

  const { t } = useLocale();

  const { offsetY } = useScrollAnimated();

  const [km, setKm] = useState(defaultValue);

  const onChange = useCallback((value: number) => {
    const km = Math.floor(value / 5);
    onRadiusChange(km);
    setKm(km);
  }, []);


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
            {placesSize} {t('slider-showing-end')}
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
          loading={loading}
          onChange={onChange}
          defaultValue={defaultValue}
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