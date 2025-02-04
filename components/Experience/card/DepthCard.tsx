import { FC, memo, } from "react";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { useLocale, useTheme } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { reusableStyle } from "@/theme/reusables";



export const DepthCard: FC = memo(function DepthCard() {

  const { t } = useLocale();
  const { colors, mode } = useTheme();

  return (
    <View
      style={styles.container}
    >
      <Ionicons
        size={18}
        color={colors[mode === 'light' ? 'gray3' : 'gray4']}
        name={'information-circle-outline'}
      />
      <Text
        variant={'caption'}
        style={styles.text}
        color={mode === 'light' ? 'gray3' : 'gray4'}
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