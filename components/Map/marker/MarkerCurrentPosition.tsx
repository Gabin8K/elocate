import { FC, memo } from "react";
import { palette } from "@/theme/palette";
import { StyleSheet } from "react-native";
import { Coordinate } from "@/services/types";
import { reusableStyle } from "@/theme/reusables";
import { MaterialIcons } from "@expo/vector-icons";
import { Marker3DContent } from "./Marker3DContent";
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






export const RadiusCurrentPosition: FC<RadiusCurrentPositionProps> = memo(function RadiusCurrentPosition(props) {
  const { radius, coordinate, currentCamera } = props;

  const radiusInKm = radius * 1000;

  if (!coordinate || !currentCamera) return null;

  return (
    <Circle
      center={coordinate}
      radius={radiusInKm}
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