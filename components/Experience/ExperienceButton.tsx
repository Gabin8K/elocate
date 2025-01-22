import { spacing } from "@/theme/spacing";
import { StyleSheet } from "react-native";
import { IconButton } from "../ui/buttons";
import { FC, memo, useCallback } from "react";
import { useExperiences } from "./ExperienceContext";
import Animated, { FadeInDown } from "react-native-reanimated";


export const ExperienceButton: FC = memo(function ExperienceButton() {
  const experience = useExperiences();

  const onPress = useCallback(()=>{
    experience.setShowExperience(true);
  }, []);

  return (
    <Animated.View
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
    </Animated.View>
  )
});


const styles = StyleSheet.create({
  icon: {
    bottom: spacing.xl,
    alignSelf: 'center',
    position: 'absolute',
  }
});