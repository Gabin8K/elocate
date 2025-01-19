import { TextInput } from "../../ui";
import { spacing } from "@/theme/spacing";
import { StyleSheet } from "react-native";
import { FC, memo, useState } from "react";
import { IconButton } from "../../ui/buttons";
import { useKeyboard, useTheme } from "@/hooks";
import useBackhandler from "@/hooks/useBackhandler";
import { useExperiences } from "../ExperienceContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";




export const InputContent: FC = memo(function InputContent() {

  const { colors } = useTheme();
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();
  const experience = useExperiences();

  const [text, setText] = useState('');

  const paddingBottom = insets.bottom + spacing.xs;

  const uas = useAnimatedStyle(() => {
    let offsetY = spacing.height * .14;
    if (experience.showReply && keyboard.visible) {
      offsetY = -keyboard.height;
    }
    else if (experience.showReply) {
      offsetY = 0;
    }
    const translateY = withTiming(offsetY);
    return {
      transform: [{ translateY }]
    }
  }, [keyboard, experience.showReply]);


  useBackhandler(() => {
    if (experience.showReply) {
      experience.setShowReply(false);
      return true;
    }
    return false;
  });


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
        onChangeText={setText}
        placeholder={'Decrivez votre experience...'}
        style={styles.input}
      />
      {keyboard.visible && text.length > 0 ?
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <IconButton
            icon={'send'}
            variant={'text'}
            iconProps={{
              size: 20,
            }}
          />
        </Animated.View> :
        null
      }
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
    flexDirection: 'row',
    paddingTop: spacing.m,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    marginHorizontal: spacing.s,
  },
})