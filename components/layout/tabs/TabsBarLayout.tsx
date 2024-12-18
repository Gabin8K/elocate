import { FC, memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks";
import { ButtonTab } from "./ButtonTab";
import { spacing } from "@/theme/spacing";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from "@/theme/palette";
import { useDrawer } from "../drawer";


type Route = {
  key: string;
  color: keyof Theme['colors'];
  name: 'index' | 'maps' | 'menu';
  iconName: keyof typeof Ionicons.glyphMap
}

const routes: Route[] = [
  {
    key: 'index',
    color: 'primary',
    name: 'index',
    iconName: 'location'
  },
  {
    key: 'maps',
    color: 'gray1',
    name: 'maps',
    iconName: 'add-circle'
  },
  {
    key: 'menu',
    color: 'gray1',
    name: 'menu',
    iconName: 'menu'
  }
]


const { width } = spacing;
export const backgroundColor = 'rgba(29, 164, 69, .3)';



export const TabsBarLayout: FC<BottomTabBarProps> = memo(function TabsBarLayout({ state, insets, navigation }) {

  const { colors, mode } = useTheme();
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
          color: 'gray1'
        }
      }
      else {
        return {
          ...route,
          color: state.index === index ? 'primary' : 'gray1'
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
        { paddingBottom: insets.bottom }
      ]}
    >
      <LinearGradient
        style={styles.background}
        colors={[
          backgroundColor,
          mode === 'light' ? 'rgba(255, 255,255, .1)' : 'rgba(0, 0, 0, .1)'
        ]}
        start={[.5, 1]}
        end={[.5, .3]}
      />
      <Animated.View
        style={[
          uas,
          styles.indicator,
          { backgroundColor: colors.primary },
        ]}
      />
      {tabs.map((route) => (
        <ButtonTab
          key={route.name}
          onPress={onPress(route)}
        >
          <Ionicons
            name={route.iconName}
            size={30}
            color={colors[route.color]}
            style={styles.icon}
          />
        </ButtonTab>
      ))}
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    bottom: 0,
    position: 'absolute',
    paddingTop: spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    top: 4,
    height: 4,
    width: 12,
    borderRadius: 4,
    position: 'absolute',
  },
  icon: {
    borderRadius: spacing.l,
    elevation: 4,
    shadowColor: palette.light.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  }
})