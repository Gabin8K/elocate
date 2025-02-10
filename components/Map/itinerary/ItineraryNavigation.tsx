import { Text } from "@/components/ui";
import { maneuvers } from "../map.styles";
import { spacing } from "@/theme/spacing";
import { FC, memo, useEffect } from "react";
import { useLocale, useTheme } from "@/hooks";
import { StyleSheet, View } from "react-native";
import { useCurrentStep } from "./useCurrentStep";
import { Portal } from "@/providers/PortalProvider";
import { IconButton } from "@/components/ui/buttons";
import { ItineraryResult, useMap } from "../MapContext";
import { component, reusableStyle } from "@/theme/reusables";
import { MapDirectionsResponse } from "react-native-maps-directions";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { Easing, SlideInDown, SlideOutDown, ZoomIn, ZoomOut } from "react-native-reanimated";


type ContentProps = {
  travelMode: ItineraryResult['travelMode'];
  itineraryReady: MapDirectionsResponse;
  showTargetItinerary?: boolean;
  closeItinerary: () => void;
  toggleTargetItinerary: () => void;
  toggleTravelMode: () => void;
}

type ArrivedProps = {
  closeItinerary: () => void;
}


export const ItineraryNavigation: FC = memo(function ItineraryNavigation() {
  const map = useMap();

  if (!map.itineraryResult?.result || !map.itinerary?.confirm) return null;

  const isArrived = map.itineraryResult.result.legs[0].distance.value <= 50;

  return (
    <Portal
      name={'itinerary-navigation'}
    >
      {isArrived ?
        <ItineraryArrived
          closeItinerary={map.closeItinerary}
        /> :
        <ItineraryNavigationContent
          travelMode={map.itineraryResult.travelMode}
          itineraryReady={map.itineraryResult.result}
          closeItinerary={map.closeItinerary}
          showTargetItinerary={map.showTargetItinerary}
          toggleTargetItinerary={map.toggleTargetItinerary}
          toggleTravelMode={map.toggleTravelMode}
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
  const { itineraryReady, showTargetItinerary, travelMode, closeItinerary, toggleTargetItinerary, toggleTravelMode } = props;

  const { t } = useLocale();
  const { colors } = useTheme();

  const currentStep = useCurrentStep({
    steps: itineraryReady.legs[0].steps,
    travelMode,
  });

  const { distance, duration } = itineraryReady.legs[0];

  const travelModeIcon = travelMode === 'WALKING' ? 'walk' : 'car';
  const directionIcon = maneuvers[currentStep?.maneuver as keyof typeof maneuvers || 'dots-horizontal'];



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
          height: spacing.xl * 3.4,
          backgroundColor: colors.card,
        }
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
      </View>
      <Text>
        {distance.text}
      </Text>
      <Animated.View
        key={directionIcon}
        entering={ZoomIn.springify()}
        exiting={ZoomOut}
      >
        <MaterialCommunityIcons
          size={30}
          name={directionIcon as any}
          color={colors.primary}
        />
      </Animated.View>
      {currentStep?.maneuver ?
        <Text
          color={'primary'}
          variant={'body2_eb'}
        >
          {currentStep.maneuver} {t('maneuver-turn-in')} {currentStep.distance.text.replaceAll(' ', '')}
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
        onPress={toggleTargetItinerary}
        icon={'trail-sign-outline'}
        styleContainer={styles.iconTarget}
        variant={showTargetItinerary ? 'primary' : 'text'}
      />
      <IconButton
        backgroundColor={'card'}
        onPress={toggleTravelMode}
        styleContainer={styles.iconTravelMode}
      >
        <MaterialCommunityIcons
          size={spacing.l}
          name={travelModeIcon}
          color={colors.primary}
        />
      </IconButton>
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
    width: spacing.width * .45,
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
  },
  iconTravelMode: {
    top: 45,
    right: -spacing.xxl,
    position: 'absolute',
  }
})


