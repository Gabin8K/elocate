import { FC, memo } from "react";
import { common } from "@/theme/palette";
import { Coordinate } from "../MapContext";
import { StyleSheet, View } from "react-native";
import { reusableStyle } from "@/theme/reusables";
import { MarkerAnimated } from "react-native-maps";
import Animated, { ZoomIn } from "react-native-reanimated";

type MarkerCurrentPositionProps = {
  coordinate?: Coordinate;
}


export const MarkerCurrentPosition: FC<MarkerCurrentPositionProps> = memo(function MarkerCurrentPosition(props) {
  const { coordinate } = props;

  if (!coordinate) return null;


  return (
    <MarkerAnimated
      coordinate={coordinate}
    >
      <Animated.View
        entering={ZoomIn}
        style={styles.container}
      >
        <View
          style={styles.rounded}
        />
      </Animated.View>
    </MarkerAnimated>
  );
});



const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: .5,
    ...reusableStyle.center,
    borderColor: common.gray5,
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  rounded: {
    width: 11,
    height: 11,
    borderRadius: 11,
    backgroundColor: common.gray5,
  }
})