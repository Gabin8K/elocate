import { Place } from "@/services/types";
import { FC, memo, useMemo } from "react";
import { spacing } from "@/theme/spacing";
import { PlaceCard } from "./card/PlaceCard";
import { usePlacesList } from "./usePlacesList";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";


export interface PlacesListProps {

}



export const PlacesList: FC<PlacesListProps> = memo(function PlacesList() {

  const { places } = usePlacesList();

  const { offsetY } = useScrollAnimated();

  const scroll = useAnimatedScrollHandler((e) => {
    offsetY.value = e.contentOffset.y;
  });

  const renderItem = useMemo(() => function renderItem({ item, index }: ListRenderItemInfo<Place>) {
    return (
      <PlaceCard
        index={index}
        place={item}
      />
    )
  }, []);


  return (
    <Animated.FlatList
      data={places}
      onScroll={scroll}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  )
})


const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: spacing.m,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.m,
  }
})