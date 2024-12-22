import { HeaderLayout } from "@/components/layout/header";
import { Stack } from "expo-router";

export default function PagesLayout() {

  return (
    <Stack
      screenOptions={{
        header: (props) => <HeaderLayout {...props} />
      }}
    >
      <Stack.Screen
        name={'experience'}
        options={{
          title: 'Experience'
        }}
      />
      <Stack.Screen
        name={'setting'}
        options={{
          title: 'Setting'
        }}
      />
      <Stack.Screen
        name={'place'}
        options={{
          title: 'Ajouter une place'
        }}
      />
      <Stack.Screen
        name={'profile'}
        options={{
          title: 'Profile'
        }}
      />
    </Stack>
  );
}
