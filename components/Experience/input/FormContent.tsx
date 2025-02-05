import { TextInput } from "../../ui";
import { FormReply } from "./FormReply";
import { spacing } from "@/theme/spacing";
import { IconButton } from "../../ui/buttons";
import { StyleSheet, View } from "react-native";
import { FormExperience } from "./FormExperience";
import { useExperiences } from "../ExperienceContext";
import { useExperienceForm } from "./useExperienceForm";
import { CommentDoc, CommentField } from "@/services/types";
import { FC, Fragment, memo, useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboard, useLocale, useTheme, useGlobalBackhandler } from "@/hooks";
import Animated, { SlideInDown, SlideOutDown, useAnimatedStyle, withTiming, ZoomIn, ZoomOut } from "react-native-reanimated";


type FormContentAnimatedProps = {
  reply?: CommentDoc;
  children?: React.ReactNode;
  onClose: (currentReply?: CommentField) => void;
}


export const FormContent: FC = memo(function FormContent(props) {

  const experience = useExperiences();
  const type = experience.reply ? 'reply' : experience.showExperience ? 'experience' : 'none';

  const onClose = useCallback((currentReply?: CommentField) => {
    experience.setReply({ reply: undefined, currentReply });
    experience.setShowExperience(false);
  }, []);

  useGlobalBackhandler(() => {
    if (experience.reply) {
      experience.setReply({ reply: undefined });
      return true;
    } else if (experience.showExperience) {
      experience.setShowExperience(false);
      return true;
    }
    return false;
  });

  return (
    <Fragment>
      {type === 'reply' ?
        <FormContentAnimated
          key={'reply'}
          onClose={onClose}
          reply={experience.reply}
        >
          <FormReply
            reply={experience.reply}
          />
        </FormContentAnimated> :
        type === 'experience' ?
          <FormContentAnimated
            key={'experience'}
            onClose={onClose}
          >
            <FormExperience />
          </FormContentAnimated> :
          null
      }
    </Fragment>
  )
});







const FormContentAnimated: FC<FormContentAnimatedProps> = memo(function FormContentAnimated(props) {
  const { reply, children, onClose } = props;

  const { t } = useLocale();
  const { colors } = useTheme();
  const keyboard = useKeyboard();
  const insets = useSafeAreaInsets();

  const form = useExperienceForm();
  const [text, setText] = useState('');

  const paddingBottom = insets.bottom + spacing.xs;

  const onChangeText = useCallback((text: string) => {
    setText(text);
    form.setValue('text', text);
  }, []);


  const onSubmit = useCallback(() => {
    form.handleSubmit(reply?.id)
      .then(doc => {
        if (doc) {
          setText('');
          onClose({ ...doc, childLength: 0 });
        }
      });
  }, [reply]);


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
            onChangeText={onChangeText}
            placeholder={!reply ? t('experience-input-placeholder') : t('experience-input-reply-placeholder')}
          />
          {text.length > 0 ?
            <Animated.View
              entering={ZoomIn}
              exiting={ZoomOut}
            >
              <IconButton
                icon={'send'}
                variant={'text'}
                onPress={onSubmit}
                loading={form.loading}
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