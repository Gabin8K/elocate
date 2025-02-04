import { FC, memo, } from "react";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { useLocale, useTheme } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { reusableStyle } from "@/theme/reusables";



export const DepthCard: FC = memo(function DepthCard() {

  const { t } = useLocale();
  const { colors } = useTheme();

  return (
    <View
      style={styles.container}
    >
      <Ionicons
        size={18}
        color={colors.gray3}
        name={'information-circle-outline'}
      />
      <Text
        variant={'caption'}
        style={styles.text}
        color={'gray3'}
      >
        {t('experience-max-depth')}
      </Text>
    </View>
  )
});



const styles = StyleSheet.create({
  container: {
    ...reusableStyle.row,
    columnGap: spacing.xs,
  },
  text: {
    flex: 1
  }
})