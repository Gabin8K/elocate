import { FC, memo } from "react";
import { CardSetting } from "./card";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { useSettingList } from "./useSettingList";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";


export interface SettingsListProps {

}



export const SettingsList: FC<SettingsListProps> = memo(function SettingsList() {

  const list = useSettingList();
  const { offsetY } = useScrollAnimated();

  const scroll = useAnimatedScrollHandler((e) => {
    offsetY.value = e.contentOffset.y;
  });


  return (
    <Animated.ScrollView
      onScroll={scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {list.settings.map((props, index) => (
        <CardSetting
          key={index}
          {...props}
        />
      ))}
    </Animated.ScrollView>
  )
})


const styles = StyleSheet.create({
  contentContainerStyle: {
    rowGap: spacing.l,
    paddingTop: spacing.lg * 5,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.s,
  }
})