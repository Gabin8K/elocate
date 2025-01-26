
import { useTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { spacing } from "@/theme/spacing";
import { FC, memo, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, { ZoomIn } from "react-native-reanimated";


type FormRequestCompletedProps = {
  onClose: () => void;
}


export const FormRequestCompleted: FC<FormRequestCompletedProps> = memo(function FormRequestCompleted(props) {
  const { onClose } = props;

  const { colors } = useTheme();

  useEffect(() => {
    setTimeout(() => onClose(), 1500);
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