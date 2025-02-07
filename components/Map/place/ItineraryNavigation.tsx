import { FC, memo } from "react";
import { useTheme } from "@/hooks";
import { useMap } from "../MapContext";
import { Text } from "@/components/ui";
import { maneuvers } from "../map.styles";
import { spacing } from "@/theme/spacing";
import { StyleSheet, View } from "react-native";
import { Portal } from "@/providers/PortalProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { component, reusableStyle } from "@/theme/reusables";
import { MapDirectionsResponse } from "react-native-maps-directions";
import Animated, { Easing, SlideInDown, SlideOutDown } from "react-native-reanimated";


type ContentProps = {
  itineraryReady: MapDirectionsResponse;
}


export const ItineraryNavigation: FC = memo(function ItineraryNavigation() {
  const map = useMap();

  if (map.itineraryResult.length === 0 || !map.itinerary?.confirm) return null;

  return (
    <Portal
      name={'itinerary-navigation'}
    >
      <ItineraryNavigationContent
        itineraryReady={map.itineraryResult[0]}
      />
    </Portal>
  );
});





const ItineraryNavigationContent: FC<ContentProps> = memo(function ItineraryNavigation(props) {
  const { itineraryReady } = props;

  const { colors } = useTheme();

  const currentStep = itineraryReady.legs[0].steps[0];
  const { distance, duration } = itineraryReady.legs[0];

  const travelModeIcon = currentStep.travel_mode === 'WALKING' ? 'walk' : 'car';
  const directionIcon = maneuvers[currentStep.maneuver as keyof typeof maneuvers || 'dots-horizontal'];

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
    </Animated.View>
  );
});



const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    bottom: spacing.l,
    rowGap: spacing.xs,
    ...component.shadow,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    borderRadius: spacing.m,
    width: spacing.width * .35,
    paddingVertical: spacing.m,
  },
  content1: {
    ...reusableStyle.row,
    columnGap: spacing.xs,
  },
})


