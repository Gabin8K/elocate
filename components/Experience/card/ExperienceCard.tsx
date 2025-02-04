import { Text } from "@/components/ui";
import { date } from "@/utils/formater";
import { DepthCard } from "./DepthCard";
import { spacing } from "@/theme/spacing";
import { useLocale, useTheme } from "@/hooks";
import { CommentField } from "@/services/types";
import { Button } from "@/components/ui/buttons";
import { reusableStyle } from "@/theme/reusables";
import { useExperiences } from "../ExperienceContext";
import { useExperienceCard } from "./useExperienceCard";
import React, { FC, memo, useCallback, useMemo } from "react";
import { FlatList, Image, ListRenderItemInfo, StyleSheet, View } from "react-native";



export type ExperienceCardProps = {
  depth: number;
  index?: number;
  item: CommentField;
  maxDepth?: boolean;
  setComments?: React.Dispatch<React.SetStateAction<CommentField[]>>;
}



export const ExperienceCard: FC<ExperienceCardProps> = memo(function ExperienceCard(props) {
  const { item, depth, maxDepth, setComments } = props;

  const { colors } = useTheme();
  const { t, locale } = useLocale();
  const { setReplyId, currentReply } = useExperiences();

  const subItem = useExperienceCard({ id: item.id, currentReply, setComments });

  const hasChild = item.childLength > 0;
  const seeMore = item.childLength - subItem.comments.length;


  const onReply = useCallback(() => {
    setReplyId({ replyId: item.id });
  }, [item.id]);


  const renderItem = useMemo(() => function renderItem({ item }: ListRenderItemInfo<ExperienceCardProps['item']>) {
    return (
      <ExperienceCard
        item={item}
        depth={depth + 1}
        maxDepth={depth === 3}
        setComments={subItem.setComments}
      />
    )
  }, [item]);


  if (maxDepth) {
    return (
      <DepthCard />
    )
  }


  return (
    <View
      style={[
        styles.container,
        depth === 0 ? styles.containerRoot : {},
      ]}
    >
      {hasChild ?
        <View
          style={[
            styles.dash1,
            depth > 0 ? styles.dash1Child : {},
            { borderColor: colors.divider },
          ]}
        /> :
        null
      }
      {depth > 0 ?
        <View
          style={[
            styles.dash2,
            depth > 1 ? styles.dash2Child : {},
            { borderColor: colors.divider },
          ]}
        /> :
        null
      }
      <Image
        style={depth === 0 ? styles.avatar : styles.avatarChild}
        source={{ uri: item.user.photoURL }}
      />
      <View
        style={styles.content}
      >
        <Text
          style={[
            styles.text,
            {
              backgroundColor: colors.card,
              boxShadow: `0 0 30 ${colors.shadow}`,
            },
          ]}
        >
          {item.text}
        </Text>
        {hasChild ?
          <FlatList
            data={subItem.comments}
            renderItem={renderItem}
          /> :
          null
        }
        <View
          style={[
            styles.footer,
            !seeMore && depth >= 2 ? styles.footerPadding : {}
          ]}
        >
          <Text
            color={'gray3'}
            variant={'caption_m'}
          >
            {date(item.createdAt, locale)}
          </Text>
          <View
            style={reusableStyle.row}
          >
            {seeMore ?
              <Button
                variant={'transparent'}
                containerStyle={styles.button}
                onPress={subItem.seeMore}
                textStyle={{
                  color: 'text',
                  variant: 'caption_m',
                }}
              >
                {t('experience-card-seemore-btn')} ({seeMore})
              </Button> :
              null
            }
            {depth < 3 ?
              <Button
                onPress={onReply}
                variant={'transparent'}
                containerStyle={styles.button}
                textStyle={{
                  color: 'text',
                  variant: 'caption_m',
                }}
              >
                {t('experience-card-reply-btn')}
              </Button> :
              null
            }
          </View>
        </View>
      </View>
    </View>
  )
})






const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'row',
    columnGap: spacing.xs,
  },
  containerRoot: {
    paddingBottom: spacing.m,
  },
  avatar: {
    width: spacing.l,
    height: spacing.l,
    borderRadius: spacing.l,
  },
  avatarChild: {
    width: spacing.m,
    height: spacing.m,
    borderRadius: spacing.m,
  },
  dash1: {
    top: 0,
    width: spacing.s,
    bottom: spacing.lg,
    borderLeftWidth: 1,
    left: spacing.l / 2,
    borderBottomWidth: 1,
    position: 'absolute',
    borderBottomLeftRadius: spacing.s,
  },
  dash1Child: {
    bottom: spacing.m,
    left: spacing.m / 2,
  },
  dash2: {
    height: spacing.m,
    borderLeftWidth: 1,
    top: -spacing.m / 2,
    borderBottomWidth: 1,
    position: 'absolute',
    width: spacing.l / 2 + spacing.xs,
    borderBottomLeftRadius: spacing.s,
    left: -(spacing.m / 2 + spacing.xs) - spacing.xs,
  },
  dash2Child: {
    left: -(spacing.m / 2 + spacing.xs),
  },
  content: {
    flex: 1,
    rowGap: spacing.xs,
  },
  text: {
    padding: spacing.s,
    borderRadius: spacing.m,
  },
  footer: {
    ...reusableStyle.row,
    justifyContent: 'space-between',
  },
  footerPadding: {
    paddingVertical: spacing.xs
  },
  button: {
    boxShadow: undefined,
    paddingHorizontal: spacing.xs,
  }
})