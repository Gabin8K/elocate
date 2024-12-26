import { FC, memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonTab } from "./ButtonTab";
import { spacing } from "@/theme/spacing";
import { Theme } from "@/theme";
import { useDrawer } from "../drawer";
import { common, palette } from "@/theme/palette";
import { useTheme } from "@/hooks";
import { component, reusableStyle } from "@/theme/reusables";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { Ionicons } from "@expo/vector-icons";


type Route = {
  key: string;
  color: keyof Theme['colors'];
  name: 'index' | 'maps' | 'menu';
  icon: keyof typeof Ionicons.glyphMap;
}

const routes: Route[] = [
  {
    key: 'index',
    color: 'primary',
    name: 'index',
    icon: 'map',
  },
  {
    key: 'maps',
    color: 'text',
    name: 'maps',
    icon: 'location'
  },
  {
    key: 'menu',
    color: 'text',
    name: 'menu',
    icon: 'menu'
  }
]


const width = spacing.width;



export const TabsBarLayout: FC<BottomTabBarProps> = memo(function TabsBarLayout({ state, insets, navigation }) {

  const { colors } = useTheme();
  const { open, setOpen } = useDrawer();

  const tabs = useMemo<Route[]>(() => {
    return routes.map((route, index) => {
      if (route.name === 'menu' && open) {
        return {
          ...route,
          color: 'primary'
        };
      }
      else if (open) {
        return {
          ...route,
          icon: `${route.icon}-outline` as Route['icon'],
          color: 'text'
        }
      }
      else {
        return {
          ...route,
          icon: (state.index === index ? route.icon : `${route.icon}-outline`) as Route['icon'],
          color: state.index === index ? 'primary' : 'text'
        }
      }
    })
  }, [state, open])


  const onPress = useCallback((route: Route) => () => {
    setOpen(route.name === 'menu')
    if (route.name === 'menu') return;

    navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true
    })
    navigation.navigate(route.name)
  }, [navigation])


  const uas = useAnimatedStyle(() => {
    const x = width / routes.length;
    const index = !open ? state.index : 2;
    return {
      left: withSpring((index + 1) * x - x / 2 - 6)
    }
  }, [state.index, open])


  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: colors.card,
        }
      ]}
    >
      <Animated.View
        style={[
          uas,
          styles.indicator
        ]}
      />
      {tabs.map((route) => (
        <ButtonTab
          key={route.name}
          onPress={onPress(route)}
        >
          <Ionicons
            name={route.icon}
            size={38}
            color={palette.light[route.color]}
          />
        </ButtonTab>
      ))}
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    width,
    paddingTop: spacing.m,
    ...reusableStyle.row,
    ...component.shadow
  },
  indicator: {
    zIndex: 1,
    top: 4,
    height: 4,
    width: 12,
    position: 'absolute',
    borderRadius: spacing.s,
    backgroundColor: palette.light.primary,
    boxShadow: `0px 4px 4px ${common.gray3}`,
  }
})