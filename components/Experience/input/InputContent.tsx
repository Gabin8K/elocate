import { FC, memo } from "react";
import { TextInput } from "../../ui";
import { spacing } from "@/theme/spacing";
import { InputMedia } from "./InputMedia";
import { IconButton } from "../../ui/buttons";
import { StyleSheet, View } from "react-native";
import { reusableStyle } from "@/theme/reusables";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { LinearTransition, ZoomIn } from "react-native-reanimated";




export const InputContent: FC = memo(function InputContent() {

  const insets = useSafeAreaInsets();

  const paddingBottom = insets.bottom + spacing.l;


  return (
    <Animated.View
      layout={LinearTransition}
      entering={ZoomIn}
      style={[
        styles.container,
        { paddingBottom },
      ]}
    >
      <TextInput
        multiline
        numberOfLines={2}
        placeholder={'Decrivez votre experience...'}
        style={styles.input}
      />
      <View
        style={styles.actions}
      >
        <InputMedia />
        <IconButton
          icon={'send'}
          variant={'primary'}
        />
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
    position: 'absolute',
    ...reusableStyle.row,
    columnGap: spacing.m,
    paddingTop: spacing.m,
    paddingHorizontal: spacing.l,
  },
  input: {
    ...reusableStyle.flex,
  },
  actions: {
    ...reusableStyle.row,
    justifyContent: 'flex-end',
  }
})