import { useTheme } from "@/hooks";
import { FC, Fragment, memo } from "react";
import { Coordinate } from "@/services/types";
import { StyleSheet, View } from "react-native";
import { reusableStyle } from "@/theme/reusables";
import { Marker3DContent } from "./Marker3DContent";
import { PointRipple, ripples } from "./PointRipple";
import { Camera, MarkerAnimated } from "react-native-maps";


type MarkerPlaceProps = {
  open?: boolean;
  coordinate?: Coordinate;
}

type MarkerPlaceNearMeProps = {
  coordinates: Coordinate[];
  currentCamera?: Camera;
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
  const { coordinates, currentCamera } = props;

  const { colors } = useTheme();

  return (
    <Fragment>
      {coordinates.map((coord) => (
        <MarkerAnimated
          key={`${coord.latitude}-${coord.longitude}`}
          coordinate={coord}
        >
          <Marker3DContent
            currentCamera={currentCamera}
            style={[
              styles.box,
              { backgroundColor: colors.primary_light }
            ]}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: colors.primary }
              ]}
            />
          </Marker3DContent>
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
  box: {
    width: 20,
    height: 20,
    borderRadius: 10,
    ...reusableStyle.center,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
  }
})