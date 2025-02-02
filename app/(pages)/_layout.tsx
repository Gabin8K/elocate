import { Stack } from "expo-router";
import { useLocale, useTheme } from "@/hooks";
import { HeaderLayout, HeaderProvider } from "@/components/layout/header";

export default function PagesLayout() {

  const { t } = useLocale();
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
            title: t('experience-screen-title')
          }}
        />
        <Stack.Screen
          name={'setting'}
          options={{
            title: t('setting-screen-title')
          }}
        />
        <Stack.Screen
          name={'image-modal'}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </HeaderProvider>
  );
}
