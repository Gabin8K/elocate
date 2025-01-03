import { FC, memo } from "react";
import { StyleSheet, TextInputProps as RNTextInputProps } from "react-native";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme";
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "@/hooks";
import { TextInput as RNTextInput } from "react-native-gesture-handler";


export interface TextInputProps extends RNTextInputProps { };

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);


export const TextInput: FC<TextInputProps> = memo(function TextInput(props) {
  const { style, ...rest } = props;

  const { colors } = useTheme();
  const active = useSharedValue(0);

  const uas = useAnimatedStyle(() => {
    return {
      borderColor: active.value ? colors.primary : colors.text
    }
  }, [colors]);


  return (
    <AnimatedTextInput
      layout={LinearTransition}
      onPressIn={() => (active.value = withTiming(1))}
      onPressOut={() => (active.value = withTiming(0))}
      placeholderTextColor={colors.gray3}
      cursorColor={colors.text}
      selectionColor={colors.gray2}
      style={[
        uas,
        styles.container,
        style,
      ]}
      {...rest}
    />
  );
});


const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: spacing.s,
    paddingVertical: spacing.m,
    borderRadius: spacing.s,
    ...typography.body2,
  },
})