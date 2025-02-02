import { Text } from "@/components/ui";
import { common } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import { PlaceDoc } from "@/services/types";
import { usePlaces } from "../PlacesContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocale, useTheme } from "@/hooks";
import { date, display } from "@/utils/formater";
import { FC, memo, useCallback, useMemo } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button, IconButton } from "@/components/ui/buttons";
import { component, reusableStyle } from "@/theme/reusables";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";


export interface PlaceCardProps {
  index: number;
  place: PlaceDoc;
}



export const PlaceCard: FC<PlaceCardProps> = memo(function PlaceCard(props) {
  const { place, index } = props;

  const places = usePlaces();
  const { t, locale } = useLocale();
  const { colors, mode } = useTheme();

  const time = useMemo(() => date(place.createdAt, locale as any), [place.createdAt, locale]);

  const onGetItinerary = useCallback(() => {
    places.setItinerary(place);
  }, []);

  const onShare = useCallback(() => {
    places.setSharePlace(place);
  }, []);


  const onPress = useCallback(() => {
    router.navigate({
      pathname: '/(pages)/image-modal',
      params: {
        uri: encodeURIComponent(place.imageRef ?? ''),
      }
    })
  }, [place.imageRef]);


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
      {place.imageRef ?
        <TouchableOpacity
          activeOpacity={.7}
          onPress={onPress}
        >
          <Image
            style={styles.image}
            source={{ uri: place.imageRef }}
          />
        </TouchableOpacity> :
        null
      }
      <View
        style={[
          styles.content,
          { marginTop: !place.imageRef ? spacing.m : undefined }
        ]}
      >
        <View>
          <Text>
            {place.address}
          </Text>
          {place.description ?
            <Text
              color={'gray4'}
            >
              {place.description}
            </Text> :
            null
          }
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
              size={18}
              name={'calendar-outline'}
              color={mode === 'light' ? colors.text : colors.gray1}
            />
            <Text
              variant={'caption'}
            >
              {time}
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
              {display(place.user.displayName, 12)}
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
            {t('places-card-get-direction-btn')}
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
    borderRadius: spacing.m,
    paddingBottom: spacing.m,
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    ...component.shadow,
    height: spacing.height * .15,
  },
  content: {
    rowGap: spacing.s,
    paddingHorizontal: spacing.m,
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