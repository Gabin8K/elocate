import { Tabs } from "expo-router";
import { useTheme } from "@/hooks";
import React, { Fragment } from "react";
import { NavigationBar } from "@/components/ui";
import { TabsBarLayout } from "@/components/layout/tabs";
import { DrawerLayout, DrawerProvider } from "@/components/layout/drawer";
import { HeaderLayout, HeaderProvider } from "@/components/layout/header";


const tabs: React.ComponentProps<typeof Tabs.Screen>[] = [
  {
    name: 'index',
    options: {
      headerShown: false,
    }
  },
  {
    name: 'places',
    options: {
      title: 'Places',
    }
  },
];


export default function TabsLayout() {
  const { colors } = useTheme();

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