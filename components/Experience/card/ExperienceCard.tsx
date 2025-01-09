import { useTheme } from "@/hooks";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { FC, memo, useMemo } from "react";
import { ExperienceImage } from "./ExperienceImage";
import { Image, StyleProp, StyleSheet, TextStyle, View } from "react-native";


export type ExperienceCardProps = {
  index: number;
  item: any;
}



export const ExperienceCard: FC<ExperienceCardProps> = memo(function ExperienceCard(props) {
  const { index } = props;

  const { colors, mode } = useTheme();

  const style = useMemo<StyleProp<TextStyle>>(() => {
    return index % 2 === 0 ? {
      backgroundColor: mode === 'light' ? colors.gray2 : colors.gray4,
      ...styles.textLeft,
    } : {
      backgroundColor: mode === 'light' ? colors.gray1 : colors.card,
      ...styles.textRight,
    }
  }, [colors, mode, index]);


  return (
    <View
      style={styles.container}
    >
      <View
        style={[
          styles.content,
          { flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }
        ]}
      >
        <Image
          style={styles.avatar}
          source={{ uri: 'https://picsum.photos/200/300' }}
        />
        <Text
          style={[
            style,
            styles.text,
          ]}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </Text>
      </View>
      {index === 1 ?
        <ExperienceImage
          index={index}
          uri={'https://picsum.photos/200/300'}
        /> :
        null
      }
      <Text
        color={'gray3'}
        variant={'caption_m'}
        style={styles.date}
      >
        Il y a 2 jours
      </Text>
    </View>
  )
})




const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.l,
    marginHorizontal: spacing.m,
    rowGap: spacing.s,
  },
  content: {
    columnGap: spacing.xs,
  },
  avatar: {
    width: spacing.l,
    height: spacing.l,
    alignSelf: 'flex-start',
    borderRadius: spacing.l,
  },
  text: {
    flex: 1,
    padding: spacing.s,
    borderRadius: spacing.m,
  },
  textLeft: {
    marginRight: spacing.lg,
  },
  textRight: {
    marginLeft: spacing.lg,
  },
  date: {
    textAlign: 'center',
  }
})