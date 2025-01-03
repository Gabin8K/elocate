import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { Switch } from "../ui";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";


export interface SettingsListProps {

}



export const SettingsList: FC<SettingsListProps> = memo(function SettingsList() {

  const { offsetY } = useScrollAnimated();

  const scroll = useAnimatedScrollHandler((e) => {
    offsetY.value = e.contentOffset.y;
  });

  return (
    <Animated.ScrollView
      onScroll={scroll}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    >
      <Switch />
    </Animated.ScrollView>
  )
})


const styles = StyleSheet.create({
  contentContainerStyle: {
    rowGap: spacing.m,
    paddingTop: spacing.m,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.s,
  }
})