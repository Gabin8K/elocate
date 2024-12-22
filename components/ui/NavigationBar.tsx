import { FC, memo, useEffect } from "react";
import * as  ExpoNavigationBar from "expo-navigation-bar";
import { useTheme } from "@/hooks/useTheme";
import { Theme } from "@/theme";
import { Platform } from "react-native";

type Props = {
  color?: keyof Theme['colors'],
  visility?: 'hidden' | 'visible',
  transparent?: boolean,
};

export const NavigationBar: FC<Props> = memo(function StatusBar(props) {
  const { color, visility, transparent } = props
  const { colors } = useTheme()

  useEffect(() => {
    const setNavigationBar = async () => {
      if (Platform.OS !== 'android') return;
      await ExpoNavigationBar.setPositionAsync('absolute')
      if (visility !== undefined) {
        await ExpoNavigationBar.setVisibilityAsync(visility)
      }
      if (transparent) {
        await ExpoNavigationBar.setBackgroundColorAsync("#ffffff01");
        await ExpoNavigationBar.setButtonStyleAsync("dark");
      }
      if (color) {
        await ExpoNavigationBar.setBackgroundColorAsync(colors[color]);
      }
    }
    setNavigationBar()
  }, [props])


  return null;
})