import { Theme } from "@/theme";
import { useTheme } from "@/hooks";
import { useDrawer } from "../drawer";
import { ButtonTab } from "./ButtonTab";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { reusableStyle } from "@/theme/reusables";
import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useScrollAnimated } from "@/providers/ScrollAnimatedProvider";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";


type Route = {
  key: string;
  color: keyof Theme['colors'];
  name: 'index' | 'places' | 'menu';
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
    key: 'places',
    color: 'text',
    name: 'places',
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
const height = spacing.height * .1;



export const TabsBarLayout: FC<BottomTabBarProps> = memo(function TabsBarLayout({ state, insets, navigation }) {

  const { colors } = useTheme();
  const { open, setOpen } = useDrawer();
  const { direction } = useScrollAnimated();

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



  const uasLayout = useAnimatedStyle(() => {
    const translateY = withTiming(direction.value === 'up' ? 0 : height);
    return {
      transform: [{ translateY }],
      ...state.index === 1 ? {
        bottom: 0,
        position: 'absolute',
      }: {
        position: 'relative',
        bottom: undefined,
      }
    }
  }, [state.index])



  const uas = useAnimatedStyle(() => {
    const x = width / routes.length;
    const index = !open ? state.index : 2;
    return {
      left: withSpring((index + 1) * x - x / 2 - 6)
    }
  }, [state.index, open]);



  useEffect(() => {
    if (state.index !== 1) {
      direction.value = 'up';
    }
  }, [state.index])



  return (
    <Animated.View
      style={[
        uasLayout,
        styles.container,
        {
          backgroundColor: colors.card,
          paddingBottom: insets.bottom + spacing.s,
          boxShadow: `0 4 4 ${colors.shadow}, 0 -4 4 ${colors.shadow}`,
        }
      ]}
    >
      <Animated.View
        style={[
          uas,
          styles.indicator,
          { boxShadow: `0 4 4 ${colors.shadow}` }
        ]}
      />
      {tabs.map((route) => (
        <ButtonTab
          key={route.name}
          onPress={onPress(route)}
        >
          <Ionicons
            size={30}
            name={route.icon}
            color={colors[route.color]}
          />
        </ButtonTab>
      ))}
    </Animated.View>
  )
})



const styles = StyleSheet.create({
  container: {
    width,
    ...reusableStyle.row,
    paddingTop: spacing.m,
  },
  indicator: {
    zIndex: 1,
    top: 4,
    height: 4,
    width: 12,
    position: 'absolute',
    borderRadius: spacing.s,
    backgroundColor: palette.light.primary,
  }
})