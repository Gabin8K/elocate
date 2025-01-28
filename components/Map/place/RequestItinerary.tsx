import { FC, memo } from "react";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { StyleSheet, View, } from "react-native";
import { Button } from "@/components/ui/buttons";
import { Itinerary, useMap } from "../MapContext";
import { Portal } from "@/providers/PortalProvider";
import { component, reusableStyle } from "@/theme/reusables";
import { useBackhandler, useLocale, useTheme } from "@/hooks";
import Animated, { Easing, SlideInDown, SlideOutDown } from "react-native-reanimated";


type RenderRequestItineraryProps = {
  itinerary: Itinerary;
  closeItinerary: () => void;
  confirmRequestItinerary: () => void;
}



export const RequestItinerary: FC = memo(function RequestItinerary() {
  const map = useMap();

  useBackhandler(() => {
    if (map.itinerary?.open) {
      map.closeItinerary();
      return true;
    }
    return false;
  });


  return (
    <Portal
      name={'request-itinerary'}
    >
      {map.itinerary?.open ?
        <RenderRequestItinerary
          itinerary={map.itinerary}
          closeItinerary={map.closeItinerary}
          confirmRequestItinerary={map.confirmRequestItinerary}
        /> :
        null
      }
    </Portal>
  );
});




const RenderRequestItinerary: FC<RenderRequestItineraryProps> = memo(function RenderRequestItinerary(props) {
  const { itinerary, closeItinerary, confirmRequestItinerary } = props;

  const { t } = useLocale();

  const { colors, mode } = useTheme();

  return (
    <Animated.View
      entering={
        SlideInDown
          .springify()
          .damping(50)
      }
      exiting={
        SlideOutDown
          .duration(1000)
          .easing(Easing.ease)
      }
      style={[
        styles.container,
        { backgroundColor: colors.card }
      ]}
    >
      <View>
        <Text
          variant={'body2_m'}
        >
          {t('request-itinerary-modal-title')}
        </Text>
        <Text
          color={'primary'}
          variant={'body2_b'}
          style={styles.address}
        >
          {itinerary.index}: {itinerary.place.address}
        </Text>
      </View>
      <View
        style={styles.buttons}
      >
        <Button
          variant={'text'}
          onPress={confirmRequestItinerary}
          textStyle={{
            color: mode === 'light' ? 'gray1' : 'background'
          }}
        >
          {t('yes')}
        </Button>
        <Button
          variant={'error'}
          onPress={closeItinerary}
        >
          {t('no')}
        </Button>
      </View>
    </Animated.View>
  );
});




const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    bottom: spacing.l,
    rowGap: spacing.m,
    ...component.shadow,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: spacing.s,
    paddingVertical: spacing.m,
    marginHorizontal: spacing.l,
    paddingHorizontal: spacing.m,
  },
  address: {
    padding: spacing.s,
    textAlign: 'center',
    marginTop: spacing.s,
    borderRadius: spacing.s,
    backgroundColor: 'rgba(0,0,0,.15)',
  },
  buttons: {
    ...reusableStyle.row,
    columnGap: spacing.s,
    justifyContent: 'center',
  }
})
