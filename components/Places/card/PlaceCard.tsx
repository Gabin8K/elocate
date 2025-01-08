import { Text } from "@/components/ui";
import { useTheme } from "@/hooks";
import { Place } from "@/services/types";
import { common } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import { Ionicons } from "@expo/vector-icons";
import { FC, memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { CardImage } from "./CardImage";
import Animated, { FadeIn } from "react-native-reanimated";
import { usePlaces } from "../PlacesContext";
import { Button, IconButton } from "@/components/ui/buttons";
import { component, reusableStyle } from "@/theme/reusables";


export interface PlaceCardProps {
  index: number;
  place: Place;
}



export const PlaceCard: FC<PlaceCardProps> = memo(function PlaceCard(props) {
  const { place, index } = props;

  const places = usePlaces()
  const { colors, mode } = useTheme();

  const onGetItinerary = useCallback(() => {
    places.setItinerary(place);
  }, []);

  const onShare = useCallback(() => {
    places.setSharePlace(place);
  }, []);


  return (
    <Animated.View
      entering={
        FadeIn
          .delay(index * 200)
          .duration(500)
      }
      style={[
        styles.container,
        { backgroundColor: colors.card }
      ]}
    >
      {place.image ?
        <CardImage
          uri={place.image}
        /> :
        null
      }
      <View
        style={[
          styles.content,
          { marginTop: !place.image ? spacing.m : undefined }
        ]}
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
            style={[
              styles.chips,
              { backgroundColor: mode === 'light' ? common.gray2 : colors.gray4 }
            ]}
          >
            <Ionicons
              name={'calendar-outline'}
              size={18}
              color={mode === 'light' ? colors.text : colors.gray1}
            />
            <Text
              variant={'caption'}
            >
              3 days ago
            </Text>
          </View>
          <View
            style={[
              styles.chips,
              { backgroundColor: mode === 'light' ? common.gray2 : colors.gray4 }
            ]}
          >
            <Ionicons
              size={18}
              name={'person-outline'}
              color={mode === 'light' ? colors.text : colors.gray1}
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
            variant={mode === 'light' ? 'text' : 'background'}
            onPress={onGetItinerary}
            textStyle={{
              variant: 'caption_b',
            }}
            startIcon={
              <Ionicons
                size={18}
                name={'swap-horizontal-outline'}
                color={mode === 'light' ? colors.background : colors.text}
              />
            }
          >
            Obtenir l'itinéraire
          </Button>
          <IconButton
            onPress={onShare}
            variant={'text'}
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
    overflow: 'hidden',
    ...component.shadow,
    marginTop: spacing.s,
    paddingBottom: spacing.m,
    borderRadius: spacing.m,
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
    padding: spacing.xs,
    borderRadius: spacing.s,
  },
  footer: {
    borderTopWidth: 1,
    ...reusableStyle.row,
    paddingTop: spacing.s,
    borderStyle: 'dashed',
    borderTopColor: common.gray2,
    justifyContent: 'space-between',
  },
  buttonShared: {
    width: spacing.lg,
    height: spacing.lg,
  }
})