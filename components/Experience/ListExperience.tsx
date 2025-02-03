import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { Entypo } from "@expo/vector-icons";
import { useComments } from "./CommentContext";
import Animated from "react-native-reanimated";
import { FC, Fragment, memo, useMemo } from "react";
import { ExperienceButton } from "./ExperienceButton";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import { ExperienceCard, ExperienceCardProps } from "./card";
import { ActivityIndicator, ListRenderItemInfo, StyleSheet } from "react-native";





export const ListExperience: FC = memo(function ListExperience() {

  const { colors } = useTheme();
  const rootComments = useComments();
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
    <Fragment>
      {rootComments.isEmtpy ?
        <Entypo
          name={'emoji-flirt'}
          color={colors.gray2}
          style={styles.empty}
          size={spacing.height * .2}
        /> :
        <Animated.FlatList
          data={rootComments.comments}
          renderItem={renderItem}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
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
      <ExperienceButton />
    </Fragment>
  )
})



const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: spacing.lg * 6,
    paddingHorizontal: spacing.s,
    paddingBottom: spacing.xl * 3,
  },
  empty: {
    margin: 'auto',
  },
  loading: {
    marginHorizontal: 'auto',
  }
})