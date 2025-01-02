import { FC, memo, useMemo } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { PlaceCard } from "./card/PlaceCard";
import { Place } from "@/services/types";
import { spacing } from "@/theme/spacing";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useHeader } from "../layout/header";


export interface PlacesListProps {

}



export const PlacesList: FC<PlacesListProps> = memo(function PlacesList() {

  const header = useHeader();

  const scroll = useAnimatedScrollHandler((e) => {
    header.offsetY.value = e.contentOffset.y;
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
      onScroll={scroll}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      data={[
        {
          id: '1',
          address: 'Address 1',
          location: 'Location 1',
          description: 'Description 1',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: '2',
          address: 'Address 2',
          location: 'Location 2',
          description: 'Description 2',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: '3',
          address: 'Address 3',
          location: 'Location 3',
          description: 'Description 3',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: '4',
          address: 'Address 4',
          location: 'Location 4',
          description: 'Description 4',
          image: 'https://via.placeholder.com/150',
        },
        {
          id: '5',
          address: 'Address 5',
          location: 'Location 5',
          description: 'Description 5',
          image: 'https://via.placeholder.com/150',
        },
      ]}
      renderItem={renderItem}
    />
  )
})


const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: spacing.m,
    paddingBottom: spacing.xl,
  }
})