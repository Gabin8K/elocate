import { Button, IconButton } from "@/components/Buttons";
import { Text } from "@/components/ui";
import { useTheme } from "@/hooks";
import { Place } from "@/services/types";
import { common } from "@/theme/palette";
import { component, reusableStyle } from "@/theme/reusables";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import { CardImage } from "./CardImage";
import Animated, { FadeIn } from "react-native-reanimated";


export interface PlaceCardProps {
  index: number;
  place: Place;
}



export const PlaceCard: FC<PlaceCardProps> = memo(function PlaceCard(props) {
  const { place, index } = props;

  const { colors } = useTheme();


  return (
    <Animated.View
      entering={
        FadeIn
          .delay(index * 200)
          .duration(500)
      }
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        }
      ]}
    >
      {place.image ?
        <CardImage
          uri={place.image}
        /> :
        null
      }
      <View
        style={styles.content}
      >
        <View>
          <Text>
            Quebec City, QC Canada
          </Text>
          <Text
            color={'gray4'}
          >
            Avenu des Champs-Élysées
          </Text>
        </View>
        <View
          style={styles.chipsContainer}
        >
          <View
            style={styles.chips}
          >
            <Ionicons
              name={'calendar-outline'}
              size={18}
            />
            <Text
              variant={'caption'}
            >
              3 days ago
            </Text>
          </View>
          <View
            style={styles.chips}
          >
            <Ionicons
              name={'person-outline'}
              size={18}
            />
            <Text
              variant={'caption'}
            >
              Franck Dernoncourt
            </Text>
          </View>
        </View>
        <View
          style={styles.footer}
        >
          <Button
            variant={'text'}
            textStyle={{
              variant: 'caption_b',
            }}
            startIcon={
              <Ionicons
                name={'swap-horizontal-outline'}
                color={colors.background}
                size={18}
              />
            }
          >
            Obtenir l'itinéraire
          </Button>
          <IconButton
            shadow
            variant={'primary'}
            icon={'share-social'}
            backgroundColor={'card'}
            styleContainer={styles.buttonShared}
            iconProps={{
              size: 18,
            }}
          />
        </View>
      </View>
    </Animated.View>
  )
})



const styles = StyleSheet.create({
  container: {
    rowGap: spacing.s,
    ...component.shadow,
    marginTop: spacing.s,
    paddingBottom: spacing.m,
  },
  content: {
    paddingHorizontal: spacing.m,
    rowGap: spacing.s,
  },
  chipsContainer: {
    ...reusableStyle.row,
    columnGap: spacing.s,
  },
  chips: {
    ...reusableStyle.row,
    columnGap: spacing.s,
    backgroundColor: common.gray2,
    padding: spacing.xs,
    borderRadius: spacing.s,
  },
  footer: {
    borderTopWidth: 1,
    ...reusableStyle.row,
    paddingTop: spacing.s,
    borderStyle: 'dashed',
    borderColor: common.gray3,
    justifyContent: 'space-between',
  },
  buttonShared: {
    width: spacing.lg,
    height: spacing.lg,
  }
})