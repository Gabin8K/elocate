import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "../ui";
import { spacing } from "@/theme/spacing";
import { HeaderChild } from "../layout/header";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";


export const HeaderSetting: FC = memo(function HeaderSetting() {
  return (
    <HeaderChild>
      <HeaderSettingContent />
    </HeaderChild>
  )
})



const HeaderSettingContent: FC = memo(function HeaderSettingContent() {

  const { offsetY } = useScrollAnimated();

  const uas = useAnimatedStyle(() => {
    const height = interpolate(offsetY.value, [0, 100], [spacing.xl + spacing.m, 0], 'clamp');
    const opacity = interpolate(offsetY.value, [0, 50], [1, 0], 'clamp');

    return {
      height,
      opacity,
    }
  }, []);


  return (
    <Animated.View
      style={[
        uas,
        styles.container,
      ]}
    >
      <Ionicons
        name={'options-outline'}
        size={spacing.m}
      />
      <Text
        color={'gray4'}
        style={styles.text}
      >
        Configurez vos préférences d'utilisation de l'application.
      </Text>
    </Animated.View>
  )
})



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: spacing.m,
    columnGap: spacing.s,
  },
  text: {
    flexBasis: '80%',
  }
})