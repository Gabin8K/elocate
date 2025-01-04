import { FC, memo } from "react";
import { Coordinate } from "../MapContext";
import { MarkerAnimated } from "react-native-maps";
import { PointRipple, ripples } from "./PointRipple";
import { StyleSheet } from "react-native";
import { reusableStyle } from "@/theme/reusables";


type MarkerPlaceProps = {
  open?: boolean;
  coordinate?: Coordinate;
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



const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    position: 'relative',
    ...reusableStyle.center,
  }
})