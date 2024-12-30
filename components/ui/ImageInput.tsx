import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "@/hooks";
import { reusableStyle } from "@/theme/reusables";
import { Text } from "./Text";
import { IconButton } from "../Buttons";


interface ImageInputProps { };



export const ImageInput: FC<ImageInputProps> = memo(function TextInput(props) {

  const { colors } = useTheme();
  const active = useSharedValue(0);

  const uas = useAnimatedStyle(() => {
    return {
      borderColor: active.value ? colors.primary : colors.text
    }
  }, [colors]);


  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        uas,
        styles.container,
      ]}
    >
      <Text
        color={'gray3'}
      >
        Ajouter une image
      </Text>
      <IconButton
        icon={'camera'}
        onPressIn={() => (active.value = withTiming(1))}
        onPressOut={() => (active.value = withTiming(0))}
        styleContainer={styles.styleContainer}
        style={{
          backgroundColor: colors.gray2,
        }}
        iconProps={{
          size: 20,
        }}
      />
    </Animated.View>
  );
});


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: spacing.s,
    ...reusableStyle.row,
    borderStyle: 'dashed',
    borderRadius: spacing.s,
    paddingVertical: spacing.s,
    justifyContent: 'space-between',
  },
  styleContainer: {
    width: spacing.lg,
    height: spacing.lg,
  }
})