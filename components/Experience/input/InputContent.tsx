import { FC, memo } from "react";
import { TextInput } from "../../ui";
import { spacing } from "@/theme/spacing";
import { InputMedia } from "./InputMedia";
import { IconButton } from "../../ui/buttons";
import { StyleSheet, View } from "react-native";
import { useKeyboard, useTheme } from "@/hooks";
import { reusableStyle } from "@/theme/reusables";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";




export const InputContent: FC = memo(function InputContent() {

  const { colors } = useTheme();
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();
  const { direction } = useScrollAnimated();

  const paddingBottom = insets.bottom + spacing.xs;

  const uas = useAnimatedStyle(() => {
    const offsetY = direction.value === 'down' ? spacing.height * .14 : -keyboard.height;
    const translateY = withTiming(offsetY);
    return {
      transform: [{ translateY }]
    }
  }, [keyboard])


  return (
    <Animated.View
      style={[
        uas,
        styles.container,
        {
          paddingBottom,
          backgroundColor: colors.card,
          boxShadow: `-4 -4 4 ${colors.shadow}`,
        },
      ]}
    >
      <TextInput
        multiline
        placeholder={'Decrivez votre experience...'}
        style={styles.input}
      />
      <View
        style={styles.actions}
      >
        <InputMedia
          visible={keyboard.visible}
        />
        {keyboard.visible ?
          <IconButton
            icon={'send'}
            variant={'text'}
            iconProps={{
              size: 20,
            }}
          /> :
          null
        }
      </View>
    </Animated.View>
  )
})



const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    rowGap: spacing.s,
    position: 'absolute',
    paddingTop: spacing.m,
    paddingHorizontal: spacing.l,
  },
  input: {
    ...reusableStyle.flex,
  },
  actions: {
    ...reusableStyle.row,
    justifyContent: 'space-between',
  }
})