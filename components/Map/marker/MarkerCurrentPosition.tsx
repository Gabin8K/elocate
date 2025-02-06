import { palette } from "@/theme/palette";
import { Itinerary } from "../MapContext";
import { Coordinate } from "@/services/types";
import { reusableStyle } from "@/theme/reusables";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, StyleSheet } from "react-native";
import { FC, memo, useCallback, useEffect, useRef } from "react";
import { Camera, Circle, MarkerAnimated } from "react-native-maps";
import { Marker3DContent, Marker3DContentItinerary } from "./Marker3DContent";

type MarkerCurrentPositionProps = {
  itinerary?: Itinerary;
  currentCamera?: Camera;
  coordinate?: Coordinate;
}


type RadiusCurrentPositionProps = {
  radius: number;
  coordinate?: Coordinate;
  currentCamera?: Camera;
}



const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedMarker = Animated.createAnimatedComponent(MarkerAnimated);



export const MarkerCurrentPosition: FC<MarkerCurrentPositionProps> = memo(function MarkerCurrentPosition(props) {
  const { itinerary, coordinate, currentCamera } = props;

  const animateLatitude = useRef(new Animated.Value(0)).current;
  const animateLongitude = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    Animated.timing(animateLatitude, {
      toValue: coordinate?.latitude || 0,
      duration: 300,
      useNativeDriver: false
    }).start();

    Animated.timing(animateLongitude, {
      toValue: coordinate?.longitude || 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [coordinate]);

  useEffect(() => {
    animate()
  }, [coordinate])

  if (!coordinate) return null;

  const children = (
    <MaterialIcons
      size={20}
      name={'navigation'}
      color={palette.light.primary}
    />
  )

  return (
    <AnimatedMarker
      coordinate={{
        latitude: animateLatitude,
        longitude: animateLongitude
      }}
    >
      {itinerary?.confirm ?
        <Marker3DContentItinerary
          style={styles.container}
        >
          {children}
        </Marker3DContentItinerary> :
        <Marker3DContent
          currentCamera={currentCamera}
          style={styles.container}
        >
          {children}
        </Marker3DContent>
      }
    </AnimatedMarker>
  );
});






export const RadiusCurrentPosition: FC<RadiusCurrentPositionProps> = memo(function RadiusCurrentPosition(props) {
  const { radius, coordinate, currentCamera } = props;
  const radiusInKm = radius * 1000;

  const progress = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    Animated.timing(progress, {
      toValue: radiusInKm,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [radiusInKm]);


  useEffect(() => {
    animate()
  }, [radius])


  if (!coordinate || !currentCamera) return null;


  return (
    <AnimatedCircle
      center={coordinate}
      radius={progress}
      strokeWidth={1.5}
      strokeColor={'rgba(29,164,69,.4)'}
      fillColor={'rgba(29,164,69,.08)'}
    />
  );
});





const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 30,
    ...reusableStyle.center,
    borderColor: palette.light.primary,
    backgroundColor: 'rgba(29,164,69,.2)',
  }
})