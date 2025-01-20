import { Place } from "@/services/types";
import { FC, memo, useMemo } from "react";
import { spacing } from "@/theme/spacing";
import { PlaceCard } from "./card/PlaceCard";
import Animated from "react-native-reanimated";
import { usePlacesList } from "./usePlacesList";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";


export interface PlacesListProps {

}



export const PlacesList: FC<PlacesListProps> = memo(function PlacesList() {

  const insets = useSafeAreaInsets();
  const { places } = usePlacesList();

  const { onScroll } = useScrollAnimated();

  const paddingTop = insets.top + 150;

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
      onScroll={onScroll}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingTop }
      ]}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  )
})


const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.m,
  }
})