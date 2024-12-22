import { FC, memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonTab } from "./ButtonTab";
import { spacing } from "@/theme/spacing";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { Theme } from "@/theme";
import { useDrawer } from "../drawer";
import { SvgProps } from "react-native-svg";
import MapSvg from "@/assets/svg/map.svg";
import VoteSvg from "@/assets/svg/vote.svg";
import MenuSvg from "@/assets/svg/menu.svg";
import { palette } from "@/theme/palette";


type Route = {
  key: string;
  color: keyof Theme['colors'];
  name: 'index' | 'maps' | 'menu';
  Icon: FC<SvgProps>;
}

const routes: Route[] = [
  {
    key: 'index',
    color: 'primary',
    name: 'index',
    Icon: MapSvg
  },
  {
    key: 'maps',
    color: 'text',
    name: 'maps',
    Icon: VoteSvg
  },
  {
    key: 'menu',
    color: 'text',
    name: 'menu',
    Icon: MenuSvg
  }
]


const width = spacing.width * 0.8;



export const TabsBarLayout: FC<BottomTabBarProps> = memo(function TabsBarLayout({ state, insets, navigation }) {
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
          color: 'text'
        }
      }
      else {
        return {
          ...route,
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
        { paddingBottom: insets.bottom }
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
          <View
            style={[
              styles.icon,
              { backgroundColor: 'white', elevation: 2 }
            ]}
          >
            <route.Icon
              fill={palette.light[route.color]}
            />
          </View>
        </ButtonTab>
      ))}
    </View>
  )
})



const styles = StyleSheet.create({
  container: {
    width,
    zIndex: 1,
    bottom: spacing.m,
    overflow: 'hidden',
    position: 'absolute',
    paddingTop: spacing.s,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  indicator: {
    zIndex: 1,
    top: 4,
    height: 4,
    width: 12,
    position: 'absolute',
    borderRadius: spacing.s,
    backgroundColor: palette.light.primary,
    boxShadow: `0px 4px 4px ${palette.common.gray3}`,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  }
})