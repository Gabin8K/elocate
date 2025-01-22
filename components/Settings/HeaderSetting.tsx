import { Text } from "../ui";
import { FC, memo } from "react";
import { spacing } from "@/theme/spacing";
import { useLocale, useTheme } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { HeaderChild } from "../layout/header";
import { StyleSheet, View } from "react-native";


export const HeaderSetting: FC = memo(function HeaderSetting() {
  return (
    <HeaderChild>
      <HeaderSettingContent />
    </HeaderChild>
  )
})



const HeaderSettingContent: FC = memo(function HeaderSettingContent() {

  const { t } = useLocale();
  const { colors } = useTheme();

  return (
    <View
      style={styles.container}
    >
      <Ionicons
        name={'options-outline'}
        color={colors['text']}
        size={spacing.m}
      />
      <Text
        color={'gray4'}
        style={styles.text}
      >
        {t('setting-screen-subtitle')}
      </Text>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: spacing.m,
    columnGap: spacing.s,
  },
  text: {
    flexBasis: '80%',
  }
})