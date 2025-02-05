import { spacing } from "@/theme/spacing";
import { FC, memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { LoginContent } from "../Map/place/modal";
import { ModalSheet } from "@/components/ui/modal";
import { useExperiences } from "./ExperienceContext";



type ModalLoginProps = {
  label?: string;
}


export const ExperienceModalLogin: FC<ModalLoginProps> = memo(function ExperienceModalLogin(props) {
  const { label } = props;

  const experience = useExperiences();

  const onClose = useCallback(() => {
    experience.closeLoginModal();
    experience.setShowExperience(false);
    experience.setReply({ reply: undefined })
  }, []);

  return (
    <ModalSheet
      onClose={onClose}
      open={experience.showLoginModal}
    >
      <View
        style={styles.container}
      >
        <LoginContent
          label={label}
        />
      </View>
    </ModalSheet>
  );
});




const styles = StyleSheet.create({
  container: {
    rowGap: spacing.m,
    paddingTop: spacing.s,
    paddingBottom: spacing.m,
  }
});