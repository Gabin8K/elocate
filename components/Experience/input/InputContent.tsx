import { spacing } from "@/theme/spacing";
import { FC, memo, useState } from "react";
import { Text, TextInput } from "../../ui";
import { IconButton } from "../../ui/buttons";
import { StyleSheet, View } from "react-native";
import { useExperiences } from "../ExperienceContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard, useLocale, useTheme, useGlobalBackhandler } from "@/hooks";
import Animated, { useAnimatedStyle, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";




export const InputContent: FC = memo(function InputContent() {

  const { t } = useLocale();
  const { colors } = useTheme();
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();
  const experience = useExperiences();

  const [text, setText] = useState('');

  const paddingBottom = insets.bottom + spacing.xs;
  const type = experience.showReply ? 'reply' : 'experience';

  const uas = useAnimatedStyle(() => {
    let offsetY = spacing.height * .14;
    if (experience.showReply && keyboard.visible) {
      offsetY = -keyboard.height;
    }
    else if (experience.showReply) {
      offsetY = 0;
    }

    if (experience.showExperience && keyboard.visible) {
      offsetY = -keyboard.height;
    }
    else if (experience.showExperience) {
      offsetY = 0;
    }

    const translateY = withTiming(offsetY);
    return {
      transform: [{ translateY }]
    }
  }, [keyboard, experience]);


  useGlobalBackhandler(() => {
    if (experience.showReply) {
      experience.setShowReply(false);
      return true;
    }
    if (experience.showExperience) {
      experience.setShowExperience(false);
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
        {type === 'reply' ?
          <Text>
            {t('experience-input-reply-title')}
            <Text
              variant={'body2_m'}
            >
              {' '}Gabin
            </Text>
          </Text> :
          null
        }
      <View
        style={styles.content}
      >
        <TextInput
          multiline
          style={styles.input}
          onChangeText={setText}
          placeholder={type === 'experience' ? t('experience-input-placeholder') : t('experience-input-reply-placeholder')}
        />
        {text.length > 0 ?
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <IconButton
              icon={'send'}
              variant={'text'}
              styleContainer={styles.icon}
              iconProps={{
                size: 20,
              }}
            />
          </Animated.View> :
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
    paddingHorizontal: spacing.s,
  },
  content: {
    flexDirection: 'row',
  },
  reply: {

  },
  input: {
    flex: 1,
    maxHeight: spacing.height * .15,
  },
  icon: {
    top: spacing.xs,
    right: -spacing.s,
  }
})