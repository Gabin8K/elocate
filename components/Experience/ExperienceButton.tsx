import { spacing } from "@/theme/spacing";
import { IconButton } from "../ui/buttons";
import { reusableStyle } from "@/theme/reusables";
import { FlatList, StyleSheet } from "react-native";
import { useExperiences } from "./ExperienceContext";
import { FC, memo, RefObject, useCallback } from "react";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";


type ExperienceButtonProps = {
  listRef: RefObject<FlatList>;
  canGoUp: boolean;
}

export const ExperienceButton: FC<ExperienceButtonProps> = memo(function ExperienceButton(props) {
  const { listRef, canGoUp } = props;

  const experience = useExperiences();

  const onPress = useCallback(() => {
    experience.setShowExperience(true);
  }, []);

  const onPressUp = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);


  return (
    <Animated.View
      layout={LinearTransition}
      style={styles.icon}
      entering={FadeInDown.duration(500)}
    >
      <IconButton
        shadow
        onPress={onPress}
        variant={'primary'}
        icon={'pencil-outline'}
        backgroundColor={'card'}
      />
      {canGoUp ?
        <IconButton
          shadow
          onPress={onPressUp}
          variant={'primary'}
          icon={'arrow-up-outline'}
          backgroundColor={'card'}
        /> :
        null
      }
    </Animated.View>
  )
});


const styles = StyleSheet.create({
  icon: {
    bottom: spacing.xl,
    alignSelf: 'center',
    position: 'absolute',
    ...reusableStyle.row,
    columnGap: spacing.s,
  }
});