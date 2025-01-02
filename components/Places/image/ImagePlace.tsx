import { spacing } from "@/theme/spacing";
import { FC, memo } from "react";
import {  StyleSheet } from "react-native";
import Animated from "react-native-reanimated";



export const ImagePlace: FC = memo(function ImagePlace() {

  return (
    <Animated.View
      style={styles.container}
    >
      {/* <Image
        source={{ uri }}
        style={styles.image}
      /> */}
    </Animated.View>
  )
})



const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    padding: spacing.s,
    borderRadius: spacing.s,
  },
  image: {
    width: '100%',
    objectFit: 'contain',
    height: spacing.height * .3,
  }
})