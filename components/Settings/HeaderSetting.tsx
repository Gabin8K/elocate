import { Text } from "../ui";
import { FC, memo } from "react";
import { useTheme } from "@/hooks";
import { spacing } from "@/theme/spacing";
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
        Configurez vos préférences d'utilisation de l'application.
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