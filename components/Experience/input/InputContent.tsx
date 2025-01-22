import { spacing } from "@/theme/spacing";
import { FC, memo, useState } from "react";
import { Text, TextInput } from "../../ui";
import { IconButton } from "../../ui/buttons";
import { StyleSheet, View } from "react-native";
import useBackhandler from "@/hooks/useBackhandler";
import { useExperiences } from "../ExperienceContext";
import { useKeyboard, useLocale, useTheme } from "@/hooks";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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


  useBackhandler(() => {
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
      <View
        style={styles.content}
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
        <TextInput
          multiline
          onChangeText={setText}
          placeholder={type === 'experience' ? t('experience-input-placeholder') : t('experience-input-reply-placeholder')}
        />
      </View>
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
  content: {
    flex: 1,
    rowGap: spacing.s,
    marginHorizontal: spacing.s,
  },
})