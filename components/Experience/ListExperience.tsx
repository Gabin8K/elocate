import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { Entypo } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { ExperienceButton } from "./ExperienceButton";
import { useExperienceList } from "./useExperienceList";
import { FC, Fragment, memo, useMemo, useRef } from "react";
import { ExperienceCard, ExperienceCardProps } from "./card";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import { ActivityIndicator, FlatList, ListRenderItemInfo, Platform, StyleSheet } from "react-native";





export const ListExperience: FC = memo(function ListExperience() {

  const { colors } = useTheme();
  const { onScroll, canGoToUp } = useScrollAnimated();
  const rootComments = useExperienceList();
  const listRef = useRef<FlatList>(null);


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
    <Fragment>
      {rootComments.isEmtpy ?
        <Entypo
          name={'emoji-flirt'}
          color={colors.gray2}
          style={styles.empty}
          size={spacing.height * .2}
        /> :
        <Animated.FlatList
          ref={listRef}
          data={rootComments.comments}
          renderItem={renderItem}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReachedThreshold={0.1}
          onEndReached={rootComments.loadMore}
          ListFooterComponent={
            rootComments.loading ?
              <ActivityIndicator
                size={spacing.lg}
                style={styles.loading}
                color={colors.primary}
              /> :
              null
          }
        />
      }
      <ExperienceButton
        listRef={listRef}
        canGoUp={canGoToUp}
      />
    </Fragment>
  )
})



const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: Platform.OS === 'android' ? spacing.lg * 6 : spacing.lg * 6.5,
    paddingHorizontal: spacing.s,
    paddingBottom: spacing.xl * 3,
    minHeight: spacing.height * .8,
  },
  empty: {
    margin: 'auto',
  },
  loading: {
    marginHorizontal: 'auto',
  }
})