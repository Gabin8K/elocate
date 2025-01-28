import { useTheme } from "@/hooks";
import { FC, memo, useMemo } from "react";
import { spacing } from "@/theme/spacing";
import { usePlaces } from "./PlacesContext";
import { PlaceDoc } from "@/services/types";
import { PlaceCard } from "./card/PlaceCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import { ActivityIndicator, ListRenderItemInfo, RefreshControl, StyleSheet } from "react-native";


export interface PlacesListProps {

}



export const PlacesList: FC<PlacesListProps> = memo(function PlacesList() {

  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const places = usePlaces();
  const { onScroll } = useScrollAnimated();


  const paddingTop = insets.top + 150;

  const renderItem = useMemo(() => function renderItem({ item, index }: ListRenderItemInfo<PlaceDoc>) {
    return (
      <PlaceCard
        index={index}
        place={item}
      />
    )
  }, []);


  return (
    <Animated.FlatList
      data={places.listOfPlaces}
      onScroll={onScroll}
      contentContainerStyle={[
        styles.contentContainerStyle,
        { paddingTop }
      ]}
      showsVerticalScrollIndicator={false}
      itemLayoutAnimation={LinearTransition}
      renderItem={renderItem}
      ListFooterComponent={
        places.loading ?
          <ActivityIndicator
            size={spacing.lg}
            style={styles.loading}
            color={colors.primary}
          /> :
          null
      }
      refreshControl={
        <RefreshControl
          onRefresh={places.onFetch}
          refreshing={places.loading as boolean}
          colors={[colors.primary, colors.text]}
        />
      }
    />
  )
})


const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.height * .2,
  },
  loading: {
    marginHorizontal: 'auto',
  }
})