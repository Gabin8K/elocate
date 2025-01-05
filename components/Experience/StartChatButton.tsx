import { FC, memo } from "react";
import { useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { IconButton } from "../ui/buttons";
import Animated, { ZoomIn } from "react-native-reanimated";




export const StartChatButton: FC = memo(function StartChatButton() {

  const { colors } = useTheme();

  return (
    <Animated.View
      entering={ZoomIn}
      style={styles.container}
    >
      <IconButton
        shadow
        icon={'chatbubble-ellipses'}
        backgroundColor={'gray2'}
        iconProps={{
          size: 20,
          color: colors.primary,
        }}
      />
    </Animated.View>
  )
})



const styles = StyleSheet.create({
  container: {
    bottom: spacing.xl,
    alignSelf: 'center',
    position: 'absolute',
  },
})