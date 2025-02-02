
import { useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { FC, memo, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ModalSheetRef } from "@/components/ui/modal";
import Animated, { ZoomIn } from "react-native-reanimated";


type FormRequestCompletedProps = {
  modalRef: React.RefObject<ModalSheetRef>;
}


export const FormRequestCompleted: FC<FormRequestCompletedProps> = memo(function FormRequestCompleted(props) {
  const { modalRef } = props;

  const { colors } = useTheme();

  useEffect(() => {
    setTimeout(() => modalRef.current?.close?.(), 1200);
  }, [])

  return (
    <Animated.View
      style={styles.container}
      entering={ZoomIn.duration(500)}
    >
      <Ionicons
        name={'checkmark-circle'}
        color={colors.primary}
        size={spacing.xl}
      />
    </Animated.View>
  );
});


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 'auto',
  }
})