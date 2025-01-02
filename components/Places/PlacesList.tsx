import { FC, memo, useMemo } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PlaceCard } from "./card/PlaceCard";
import { Place } from "@/services/types";
import { spacing } from "@/theme/spacing";


export interface PlacesListProps {

}



export const PlacesList: FC<PlacesListProps> = memo(function PlacesList() {

  const renderItem = useMemo(() => function renderItem({ item, index }: ListRenderItemInfo<Place>) {
    return (
      <PlaceCard
        index={index}
        place={item}
      />
    )
  }, []);


  return (
    <FlatList
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