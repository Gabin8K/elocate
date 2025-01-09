import { FC, memo, useMemo } from "react";
import { spacing } from "@/theme/spacing";
import Animated from "react-native-reanimated";
import { ExperienceCard, ExperienceCardProps } from "./card";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";





export const ListExperience: FC = memo(function ListExperience() {

  const { onScroll } = useScrollAnimated();

  const renderItem = useMemo(() => function renderItem({ item, index }: ListRenderItemInfo<ExperienceCardProps>) {
    return (
      <ExperienceCard
        index={index}
        item={item}
      />
    )
  }, []);


  return (
    <Animated.FlatList
      data={[1, 2, 3, 3, 4, 3] as any}
      renderItem={renderItem}
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={styles.contentContainerStyle}
    />
  )
})



const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: spacing.l,
    paddingBottom: spacing.xl * 3,
  },
})