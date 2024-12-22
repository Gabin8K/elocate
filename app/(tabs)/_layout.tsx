import React, { Fragment } from "react";
import { TabsBarLayout } from "@/components/layout/tabs";
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
        transparent
      />
      <DrawerProvider>
        <DrawerLayout />
        <Tabs
          tabBar={(props) => <TabsBarLayout {...props} />}
          screenOptions={{
            headerShown: false,
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