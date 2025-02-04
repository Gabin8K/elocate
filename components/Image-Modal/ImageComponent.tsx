import { Redirect } from "expo-router";
import { useBackhandler } from "@/hooks";
import { spacing } from "@/theme/spacing";
import { StyleSheet } from "react-native";
import { IconButton } from "@/components/ui/buttons";
import { FC, Fragment, memo, useCallback, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


type ImageComponentProps = {
  uri: string;
}


export const ImageComponent: FC<ImageComponentProps> = memo(function ImageComponent(props) {
  const { uri } = props;

  const scale = useSharedValue(1);
  const offset = useSharedValue(1);

  const [canBack, setCanBack] = useState(true);
  const [forceBack, setForceBack] = useState(false);

  const gesture = Gesture.Pinch()
    .onUpdate(e => {
      const value = offset.value * e.scale;
      if (value >= 1 && value <= 3) {
        scale.value = value;
      }
    })
    .onEnd(() => {
      offset.value = scale.value;
      runOnJS(setCanBack)(scale.value === 1);
    });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value }
      ]
    }
  }, []);


  const goBack = useCallback(() => {
    scale.value = withTiming(1);
    offset.value = 1;
    setCanBack(true);
    return true;
  }, []);


  const onPress = useCallback(() => {
    if (!canBack) {
      return goBack();
    }
    setForceBack(true);
  }, [canBack]);


  useBackhandler(() => {
    if (!canBack) {
      return goBack();
    }
    setForceBack(true);
    return true;
  })


  if (forceBack) {
    return (
      <Redirect href={'/(tabs)/places'} />
    )
  }

  return (
    <Fragment>
      <IconButton
        onPress={onPress}
        icon={'arrow-back'}
        styleContainer={styles.icon}
      />
      <GestureDetector
        gesture={gesture}
      >
        <Animated.Image
          style={[
            uas,
            styles.image,
          ]}
          source={{ uri }}
          resizeMode={'cover'}
        />
      </GestureDetector>
    </Fragment>
  )
});




const styles = StyleSheet.create({
  icon: {
    zIndex: 1,
    top: spacing.xl,
    left: spacing.s,
    position: 'absolute',
  },
  image: {
    width: '100%',
    objectFit: 'cover',
    marginVertical: 'auto',
    backgroundColor: 'black',
    height: spacing.height * .5,
  },
})