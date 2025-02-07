import { Camera } from "react-native-maps";
import { FC, memo, ReactNode } from "react";
import { useHeading } from "@/hooks/useLocation";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";

type ContentProps = {
  currentCamera?: Camera;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

type ContentItineraryProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}


export const Marker3DContent: FC<ContentProps> = memo(function Marker3DContent(props) {
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





export const Marker3DContentItinerary: FC<ContentItineraryProps> = memo(function Marker3DContentItinerary(props) {
  const { style, children } = props;

  const rotation = useHeading(0);

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: '60deg' },
        { rotate: `${rotation}deg` },
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