import { FC, memo } from "react";
import { palette } from "@/theme/palette";
import { StyleSheet } from "react-native";
import { Coordinate } from "@/services/types";
import { reusableStyle } from "@/theme/reusables";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera, MarkerAnimated } from "react-native-maps";
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";

type MarkerCurrentPositionProps = {
  currentCamera?: Camera;
  coordinate?: Coordinate;
}


export const MarkerCurrentPosition: FC<MarkerCurrentPositionProps> = memo(function MarkerCurrentPosition(props) {
  const { coordinate, currentCamera } = props;

  const rotate3d = useDerivedValue(() => {
    const pith = currentCamera?.pitch === undefined ? 0 : currentCamera.pitch;
    return withTiming(pith);
  }, [currentCamera?.pitch]);

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: `${rotate3d.value}deg` },
      ],
    }
  }, []);


  if (!coordinate) return null;


  return (
    <MarkerAnimated
      coordinate={coordinate}
    >
      <Animated.View
        style={[
          uas,
          styles.container,
        ]}
      >
        <MaterialIcons
          size={20}
          name={'navigation'}
          color={palette.light.primary}
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
    borderWidth: 2,
    borderRadius: 30,
    ...reusableStyle.center,
    borderColor: palette.light.primary,
    backgroundColor: 'rgba(29,164,69,.2)',
  }
})