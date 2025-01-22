import { Tabs } from "expo-router";
import { useLocale, useTheme } from "@/hooks";
import { NavigationBar } from "@/components/ui";
import React, { Fragment, useMemo } from "react";
import { TabsBarLayout } from "@/components/layout/tabs";
import { DrawerLayout, DrawerProvider } from "@/components/layout/drawer";
import { HeaderLayout, HeaderProvider } from "@/components/layout/header";



export default function TabsLayout() {

  const { t } = useLocale();
  const { colors } = useTheme();

  const tabs = useMemo<React.ComponentProps<typeof Tabs.Screen>[]>(() => [
    {
      name: 'index',
      options: {
        headerShown: false,
      }
    },
    {
      name: 'places',
      options: {
        title: t('places-screen-title')
      }
    },
  ], [t]);



  return (
    <Fragment>
      <NavigationBar
        transparent
      />
      <DrawerProvider>
        <DrawerLayout />
        <HeaderProvider>
          <Tabs
            tabBar={(props) => <TabsBarLayout {...props} />}
            screenOptions={{
              header: (props) => <HeaderLayout {...props as any} />,
              sceneStyle: {
                backgroundColor: colors.background,
              },
            }}
          >
            {tabs.map(tab => (
              <Tabs.Screen
                key={tab.name}
                {...tab}
              />
            ))}
          </Tabs>
        </HeaderProvider>
      </DrawerProvider>
    </Fragment>
  )
}