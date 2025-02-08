import { useMap } from "../MapContext";
import { Text } from "@/components/ui";
import { maneuvers } from "../map.styles";
import { spacing } from "@/theme/spacing";
import { useLocale, useTheme } from "@/hooks";
import { StyleSheet, View } from "react-native";
import { Portal } from "@/providers/PortalProvider";
import { IconButton } from "@/components/ui/buttons";
import { FC, memo, useCallback, useEffect } from "react";
import { component, reusableStyle } from "@/theme/reusables";
import { MapDirectionsResponse } from "react-native-maps-directions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { Easing, SlideInDown, SlideOutDown } from "react-native-reanimated";


type ContentProps = {
  itineraryReady: MapDirectionsResponse;
  showTargetItinerary?: boolean;
  closeItinerary: () => void;
  moveToTargetItinerary: () => void;
  closeTargetItinerary: () => void;
}

type ArrivedProps = {
  closeItinerary: () => void;
}


export const ItineraryNavigation: FC = memo(function ItineraryNavigation() {
  const map = useMap();

  if (map.itineraryResult.length === 0 || !map.itinerary?.confirm) return null;

  const isArrived = map.itineraryResult[0].legs[0].distance.value <= 50;

  return (
    <Portal
      name={'itinerary-navigation'}
    >
      {isArrived ?
        <ItineraryArrived
          closeItinerary={map.closeItinerary}
        /> :
        <ItineraryNavigationContent
          itineraryReady={map.itineraryResult[0]}
          closeItinerary={map.closeItinerary}
          showTargetItinerary={map.showTargetItinerary}
          moveToTargetItinerary={map.moveToTargetItinerary}
          closeTargetItinerary={map.closeTargetItinerary}
        />
      }
    </Portal>
  );
});







const ItineraryArrived: FC<ArrivedProps> = memo(function ItineraryArrived(props) {
  const { closeItinerary } = props;

  const { t } = useLocale();
  const { colors } = useTheme();

  useEffect(() => {
    setTimeout(() => closeItinerary(), 3000);
  }, []);

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
        {
          width: '65%',
          backgroundColor: colors.card,
        }
      ]}
    >
      <Ionicons
        size={30}
        color={colors.primary}
        name={'checkmark-circle'}
      />
      <Text
        variant={'body2_b'}
        style={styles.textArrived}
      >
        {t('place-itinerary-arrived')}
      </Text>
    </Animated.View>
  );
});








const ItineraryNavigationContent: FC<ContentProps> = memo(function ItineraryNavigation(props) {
  const { itineraryReady, showTargetItinerary, closeItinerary, closeTargetItinerary, moveToTargetItinerary } = props;

  const { colors } = useTheme();

  const currentStep = itineraryReady.legs[0].steps[0];
  const { distance, duration } = itineraryReady.legs[0];

  const travelModeIcon = currentStep.travel_mode === 'WALKING' ? 'walk' : 'car';
  const directionIcon = maneuvers[currentStep.maneuver as keyof typeof maneuvers || 'dots-horizontal'];


  const onPressTarget = useCallback(() => {
    if (showTargetItinerary) {
      closeTargetItinerary();
    } else {
      moveToTargetItinerary();
    }
  }, [showTargetItinerary]);


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
      <View
        style={styles.content1}
      >
        <Text
          variant={'body1_b'}
        >
          {duration.text}
        </Text>
        <MaterialCommunityIcons
          size={20}
          name={travelModeIcon}
          color={colors.text}
        />
      </View>
      <Text>
        {distance.text}
      </Text>
      <MaterialCommunityIcons
        size={30}
        name={directionIcon as any}
        color={colors.primary}
      />
      {currentStep.maneuver ?
        <Text
          color={'primary'}
          variant={'body2_eb'}
        >
          {currentStep.maneuver}
        </Text> :
        null
      }
      <IconButton
        icon={'close'}
        variant={'error'}
        backgroundColor={'card'}
        onPress={closeItinerary}
        styleContainer={styles.iconClose}
      />
      <IconButton
        backgroundColor={'card'}
        onPress={onPressTarget}
        icon={'trail-sign-outline'}
        styleContainer={styles.iconTarget}
        variant={showTargetItinerary ? 'primary' : 'text'}
      />
    </Animated.View>
  );
});



const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    rowGap: spacing.xs,
    ...component.shadow,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    borderRadius: spacing.m,
    width: spacing.width * .35,
    paddingVertical: spacing.m,
    transform: [
      { translateY: spacing.height - 175 }
    ],
  },
  content1: {
    ...reusableStyle.row,
    columnGap: spacing.xs,
  },
  textArrived: {
    textAlign: 'center',
  },
  iconClose: {
    left: -spacing.xxl,
    position: 'absolute',
  },
  iconTarget: {
    right: -spacing.xxl,
    position: 'absolute',
  }
})


