import React, { Fragment } from "react";
import { backgroundColor, TabsBarLayout } from "@/components/layout/tabs";
import { Tabs } from "expo-router";
import { NavigationBar } from "@/components/ui";
import { DrawerLayout, DrawerProvider } from "@/components/layout/drawer";


const tabs: React.ComponentProps<typeof Tabs.Screen>[] = [
  {
    name: 'index',
  },
  {
    name: 'maps',
  },
];


export default function TabsLayout() {
  return (
    <Fragment>
      <NavigationBar
        staticColor={backgroundColor}
      />
      <DrawerProvider>
        <DrawerLayout />
        <Tabs
          tabBar={(props) => <TabsBarLayout {...props} />}
          screenOptions={{
            headerShown: false,
            sceneStyle: {
              backgroundColor: 'transparent'
            }
          }}
        >
          {tabs.map(tab => (
            <Tabs.Screen
              key={tab.name}
              {...tab}
            />
          ))}
        </Tabs>
      </DrawerProvider>
    </Fragment>
  )
}