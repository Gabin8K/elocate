import { HeaderLayout, HeaderProvider } from "@/components/layout/header";
import { useTheme } from "@/hooks";
import { Stack } from "expo-router";

export default function PagesLayout() {
  const { colors } = useTheme();

  return (
    <HeaderProvider>
      <Stack
        screenOptions={{
          header: (props) => <HeaderLayout {...props} />,
          contentStyle: {
            backgroundColor: colors.background,
          },
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
