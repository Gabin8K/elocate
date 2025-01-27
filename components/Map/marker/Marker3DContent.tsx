import { Camera } from "react-native-maps";
import { FC, memo, ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";

type Marker3DContentProps = {
  currentCamera?: Camera;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}


export const Marker3DContent: FC<Marker3DContentProps> = memo(function Marker3DContent(props) {
  const { currentCamera, style, children } = props;

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


  return (
    <Animated.View
      style={[
        uas,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
});