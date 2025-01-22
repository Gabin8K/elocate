import { TextInput } from "../../ui";
import { FormReply } from "./FormReply";
import { spacing } from "@/theme/spacing";
import { IconButton } from "../../ui/buttons";
import { StyleSheet, View } from "react-native";
import { FormExperience } from "./FormExperience";
import { FC, Fragment, memo, useState } from "react";
import { useExperiences } from "../ExperienceContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard, useLocale, useTheme, useGlobalBackhandler } from "@/hooks";
import Animated, { SlideInDown, SlideOutDown, useAnimatedStyle, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";


type FormContentAnimatedProps = {
  type: 'reply' | 'experience';
  children?: React.ReactNode;
}



export const FormContent: FC = memo(function FormContent() {

  const experience = useExperiences();
  const type = experience.showReply ? 'reply' : experience.showExperience ? 'experience' : 'none';

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
    <Fragment>
      {type === 'reply' ?
        <FormContentAnimated
          type={'reply'}
        >
          <FormExperience />
        </FormContentAnimated> :
        type === 'experience' ?
          <FormContentAnimated
            type={'experience'}
          >
            <FormReply />
          </FormContentAnimated> :
          null
      }
    </Fragment>
  )
});






const FormContentAnimated: FC<FormContentAnimatedProps> = memo(function FormContentAnimated(props) {
  const { type, children } = props;

  const { t } = useLocale();
  const { colors } = useTheme();
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();

  const [text, setText] = useState('');

  const paddingBottom = insets.bottom + spacing.xs;


  const uas = useAnimatedStyle(() => {
    const translateY = withTiming(-keyboard.height);
    return {
      transform: [{ translateY }]
    }
  }, [keyboard]);



  return (
    <Animated.View
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.duration(500)}
      style={styles.container}
    >
      <Animated.View
        style={[
          uas,
          styles.containerAnimated,
          {
            paddingBottom,
            backgroundColor: colors.card,
            boxShadow: `-4 -4 4 ${colors.shadow}`,
          },
        ]}
      >
        {children}
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
    </Animated.View>
  )
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  containerAnimated: {
    rowGap: spacing.s,
    paddingTop: spacing.m,
    paddingHorizontal: spacing.s,
  },
  content: {
    flexDirection: 'row',
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