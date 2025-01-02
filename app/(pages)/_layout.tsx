import { HeaderLayout, HeaderProvider } from "@/components/layout/header";
import { Stack } from "expo-router";

export default function PagesLayout() {

  return (
    <HeaderProvider>
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
      </Stack>
    </HeaderProvider>
  );
}
