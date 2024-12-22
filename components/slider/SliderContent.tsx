import { Text } from "@/components/ui";
import { palette } from "@/theme/palette";
import { reusableStyle } from "@/theme/reusables";
import { spacing } from "@/theme/spacing";
import { FC, memo, ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { SvgProps } from "react-native-svg";


export type SliderContentProps = {

}

export const SliderContent: FC<SliderContentProps> = memo(function SliderContent(props) {

  const onPress = () => {
    
  }

  return (
   <Animated.View>

   </Animated.View>
  );
})

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: spacing.m,
  },
  track:{

  }
})