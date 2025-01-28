import { useTheme } from "@/hooks";
import { Text } from "@/components/ui";
import { StyleSheet } from "react-native";
import { Itinerary } from "../MapContext";
import { Ionicons } from "@expo/vector-icons";
import { reusableStyle } from "@/theme/reusables";
import { MarkerAnimated } from "react-native-maps";
import { PointRipple, ripples } from "./PointRipple";
import { FC, Fragment, memo, useCallback } from "react";
import { Coordinate, PlaceDoc } from "@/services/types";
import Animated, { FadeOut, ZoomIn } from "react-native-reanimated";


type MarkerPlaceProps = {
  open?: boolean;
  coordinate?: Coordinate;
}

type MarkerPlaceNearMeProps = {
  places: PlaceDoc[];
  requestItinerary: (itinerary: Itinerary) => void;
}



export const MarkerPlace: FC<MarkerPlaceProps> = memo(function MarkerPlace(props) {
  const { coordinate, open } = props;

  if (!open || !coordinate) return null;

  return (
    <MarkerAnimated
      coordinate={coordinate}
      style={styles.container}
    >
      {ripples.map((index) => (
        <PointRipple
          key={index}
          index={index}
        />
      ))}
    </MarkerAnimated>
  );
});





export const MarkerPlaceNearMe: FC<MarkerPlaceNearMeProps> = memo(function MarkerPlaceNearMe(props) {
  const { places, requestItinerary } = props;

  const { colors } = useTheme();

  const onPress = useCallback((place: PlaceDoc, index:number) => {
    requestItinerary({ place, index });
  }, []);


  return (
    <Fragment>
      {places.map((place, index) => (
        <MarkerAnimated
          key={place.id}
          coordinate={place.coordinate}
          style={styles.container}
          onPress={() => onPress(place, index)}
        >
          <Animated.View
            entering={ZoomIn}
            exiting={FadeOut}
          >
            <Ionicons
              size={18}
              name={'location-outline'}
              color={colors.primary}
            />
            <Text
              color={'primary'}
              variant={'caption_eb'}
              style={styles.text}
            >
              {index + 1}
            </Text>
          </Animated.View>
        </MarkerAnimated>
      ))}
    </Fragment>
  );
});



const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    position: 'relative',
    ...reusableStyle.center,
  },
  text: {
    fontSize: 10,
    lineHeight: 10,
    textAlign: 'center',
    transform: [
      { scale: 1.5 }
    ],
  }
})