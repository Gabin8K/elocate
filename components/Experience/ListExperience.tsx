import { FC, memo, useMemo } from "react";
import { spacing } from "@/theme/spacing";
import { IconButton } from "../ui/buttons";
import Animated from "react-native-reanimated";
import { ExperienceCard, ExperienceCardProps } from "./card";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";





export const ListExperience: FC = memo(function ListExperience() {

  const { onScroll } = useScrollAnimated();

  const renderItem = useMemo(() => function renderItem({ item, index }: ListRenderItemInfo<ExperienceCardProps['item']>) {
    return (
      <ExperienceCard
        depth={0}
        item={item}
        index={index}
      />
    )
  }, []);


  return (
    <Animated.FlatList
      data={[
        1,
        [
          1,
          2,
          [
            1,
            3,
            [3, 2]
          ],
          5
        ],
        2,
        4,
        5,
        6,
        7,
        [1, 4, 5, 6],
        9,
        10,
        11,
        12
      ]}
      renderItem={renderItem}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      ListFooterComponentStyle={styles.footer}
      ListFooterComponent={
        <IconButton
          variant={'primary'}
          backgroundColor={'card'}
          icon={'chevron-down-outline'}
        />
      }
    />
  )
})



const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: spacing.lg * 6,
    paddingHorizontal: spacing.s,
    paddingBottom: spacing.xl * 3,
  },
  footer: {
    alignSelf: 'center',
  }
})