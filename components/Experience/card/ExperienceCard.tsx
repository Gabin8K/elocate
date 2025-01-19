import { useTheme } from "@/hooks";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { Button } from "@/components/ui/buttons";
import { reusableStyle } from "@/theme/reusables";
import { useExperiences } from "../ExperienceContext";
import { FC, memo, useCallback, useMemo } from "react";
import { FlatList, Image, ListRenderItemInfo, StyleSheet, View } from "react-native";



export type ExperienceCardProps = {
  depth: number;
  index?: number;
  item: any[] | any;
}



export const ExperienceCard: FC<ExperienceCardProps> = memo(function ExperienceCard(props) {
  const { item, depth } = props;

  const { colors } = useTheme();
  const { setShowReply } = useExperiences();

  const isList = useMemo(() => Array.isArray(item), [item]);


  const onReply = useCallback(() => {
    setShowReply(true);
  }, [setShowReply]);


  const renderItem = useMemo(() => function renderItem({ item, index }: ListRenderItemInfo<ExperienceCardProps['item']>) {
    return (
      <ExperienceCard
        item={item}
        depth={depth + 1}
      />
    )
  }, [item]);



  return (
    <View
      style={[
        styles.container,
        depth === 0 ? styles.containerRoot : {},
      ]}
    >
      {isList ?
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
        source={{ uri: 'https://picsum.photos/200/300' }}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </Text>
        {isList ?
          <FlatList
            data={item}
            renderItem={renderItem}
          /> :
          null
        }
        <View
          style={styles.footer}
        >
          <Text
            color={'gray3'}
            variant={'caption_m'}
          >
            Il y a 2 jours
          </Text>
          <View
            style={reusableStyle.row}
          >
            <Button
              variant={'transparent'}
              containerStyle={styles.button}
              textStyle={{
                color: 'text',
                variant: 'caption_m',
              }}
            >
              See more (10)
            </Button>
            <Button
              onPress={onReply}
              variant={'transparent'}
              containerStyle={styles.button}
              textStyle={{
                color: 'text',
                variant: 'caption_m',
              }}
            >
              Reply
            </Button>
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
  button: {
    boxShadow: undefined,
    paddingHorizontal: spacing.xs,
  }
})