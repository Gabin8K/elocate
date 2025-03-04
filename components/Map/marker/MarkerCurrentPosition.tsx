import { palette } from "@/theme/palette";
import { Itinerary } from "../MapContext";
import { Coordinate } from "@/services/types";
import { reusableStyle } from "@/theme/reusables";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera, Circle, Marker } from "react-native-maps";
import { Animated, Easing, StyleSheet } from "react-native";
import { FC, memo, useCallback, useEffect, useMemo, useRef } from "react";
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



export const MarkerCurrentPosition: FC<MarkerCurrentPositionProps> = memo(function MarkerCurrentPosition(props) {
  const { itinerary, coordinate, currentCamera } = props;

  const progressLatitude = useRef(new Animated.Value(0)).current;
  const progressLongitude = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    if (!coordinate) return;
    Animated.timing(progressLatitude, {
      toValue: coordinate.latitude,
      duration: 900,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
    Animated.timing(progressLongitude, {
      toValue: coordinate.longitude,
      duration: 900,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [coordinate]);

  useEffect(() => {
    animate()
  }, [coordinate])


  const children = useMemo(() => (
    <MaterialIcons
      size={20}
      name={'navigation'}
      color={palette.light.primary}
    />
  ), []);


  if (!coordinate) return null;

  return (
    <Marker.Animated
      coordinate={{
        latitude: progressLatitude,
        longitude: progressLongitude,
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
    </Marker.Animated>
  );
});






export const RadiusCurrentPosition: FC<RadiusCurrentPositionProps> = memo(function RadiusCurrentPosition(props) {
  const { radius, coordinate, currentCamera } = props;
  const radiusInKm = radius * 1000;

  const progress = useRef(new Animated.Value(0)).current;
  const progressLatitude = useRef(new Animated.Value(0)).current;
  const progressLongitude = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    Animated.timing(progress, {
      toValue: radiusInKm,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [radiusInKm]);

  const animateCoordinate = useCallback(() => {
    if (!coordinate) return;
    Animated.timing(progressLatitude, {
      toValue: coordinate.latitude,
      duration: 900,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
    Animated.timing(progressLongitude, {
      toValue: coordinate.longitude,
      duration: 900,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [coordinate]);


  useEffect(() => {
    animate();
    animateCoordinate();
  }, [radius])


  if (!coordinate || !currentCamera) return null;


  return (
    <AnimatedCircle
      center={{
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      }}
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