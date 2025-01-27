import { FC, memo } from "react";
import { palette } from "@/theme/palette";
import { StyleSheet } from "react-native";
import { Coordinate } from "@/services/types";
import { reusableStyle } from "@/theme/reusables";
import { MaterialIcons } from "@expo/vector-icons";
import { Marker3DContent } from "./Marker3DContent";
import { Camera, MarkerAnimated } from "react-native-maps";

type MarkerCurrentPositionProps = {
  currentCamera?: Camera;
  coordinate?: Coordinate;
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