import { palette } from "@/theme/palette";
import { Coordinate } from "@/services/types";
import { reusableStyle } from "@/theme/reusables";
import { MaterialIcons } from "@expo/vector-icons";
import { Marker3DContent } from "./Marker3DContent";
import { Animated, StyleSheet } from "react-native";
import { FC, memo, useCallback, useEffect, useRef } from "react";
import { Camera, Circle, MarkerAnimated } from "react-native-maps";

type MarkerCurrentPositionProps = {
  currentCamera?: Camera;
  coordinate?: Coordinate;
}


type RadiusCurrentPositionProps = {
  radius: number;
  coordinate?: Coordinate;
  currentCamera?: Camera;
}




export const MarkerCurrentPosition: FC<MarkerCurrentPositionProps> = memo(function MarkerCurrentPosition(props) {
  const { coordinate, currentCamera } = props;

  if (!coordinate) return null;

  return (
    <MarkerAnimated
      coordinate={coordinate}
    >
      <Marker3DContent
        currentCamera={currentCamera}
        style={styles.container}
      >
        <MaterialIcons
          size={20}
          name={'navigation'}
          color={palette.light.primary}
        />
      </Marker3DContent>
    </MarkerAnimated>
  );
});





const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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