import React, { FC, memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { component, reusableStyle } from "@/theme/reusables";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "@/components/Buttons";
import { Text } from "@/components/ui";
import ArrowLeftSvg from "@/assets/svg/arrow-left.svg";
import { spacing } from "@/theme/spacing";
import { useTheme } from "@/hooks";



export const HeaderLayout: FC<NativeStackHeaderProps> = memo(function HeaderLayout({ navigation, options }) {

  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 20;

  const onPress = useCallback(() => {
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
        Icon={ArrowLeftSvg}
      >
      </IconButton>
      <Text
        variant={'subtitle_m'}
      >
        {options.title}
      </Text>
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    columnGap: spacing.l,
    paddingBottom: spacing.s,
    ...reusableStyle.row,
    ...component.shadow,
  }
})