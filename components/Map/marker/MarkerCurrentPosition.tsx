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

  const animateCoord = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const animate = useCallback(() => {
    Animated.timing(animateCoord, {
      toValue: {
        x: coordinate?.latitude || 0,
        y: coordinate?.longitude || 0
      },
      duration: 100,
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
        latitude: animateCoord.x,
        longitude: animateCoord.y,
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
  const progresCenter = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const animate = useCallback(() => {
    Animated.timing(progress, {
      toValue: radiusInKm,
      duration: 100,
      useNativeDriver: false
    }).start();
  }, [radiusInKm]);

  const animateCoordinate = useCallback(() => {
    Animated.timing(progresCenter, {
      toValue: {
        x: coordinate?.latitude || 0,
        y: coordinate?.longitude || 0
      },
      duration: 300,
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
        latitude: progresCenter.x,
        longitude: progresCenter.y
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