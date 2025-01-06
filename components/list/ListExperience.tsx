import { FC, memo, useMemo } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";





export const ListExperience: FC = memo(function ListExperience() {

  const renderItem = useMemo(() => function renderItem({ item }: ListRenderItemInfo<{}>) {
    return null;
  }, []);


  return (
    <FlatList
      data={[]}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  )
})



const styles = StyleSheet.create({
  contentContainerStyle: {

  },
})