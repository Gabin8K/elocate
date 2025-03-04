import { useTheme } from "@/hooks";
import { Text } from "@/components/ui";
import { spacing } from "@/theme/spacing";
import { useHeader } from "./HeaderContext";
import React, { FC, memo, useCallback } from "react";
import { IconButton } from "@/components/ui/buttons";
import { Platform, StyleSheet, View } from "react-native";
import { component, reusableStyle } from "@/theme/reusables";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from '@react-navigation/native-stack';



export const HeaderLayout: FC<NativeStackHeaderProps> = memo(function HeaderLayout({ navigation, options }) {

  const header = useHeader();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = Platform.select({
    ios: insets.top,
    android: insets.top + 20,
  });

  const onPress = useCallback(() => {
    const backHandler = header.canBackHandler.current();
    if (backHandler) return;
    navigation.goBack();
  }, [navigation]);


  return (
    <View
      style={[
        styles.container,
        {
          paddingTop,
          backgroundColor: colors.card,
        }
      ]}
    >
      <IconButton
        onPress={onPress}
        icon={'arrow-back'}
        styleContainer={styles.button}
      >
      </IconButton>
      <View>
        <Text
          variant={'title_m'}
        >
          {options.title}
        </Text>
        {header.child}
      </View>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...component.shadow,
    ...reusableStyle.row,
    columnGap: spacing.l,
    position: 'absolute',
    paddingBottom: spacing.s,
  },
  button: {
    marginTop: -10,
    alignSelf: 'flex-start',
  }
})