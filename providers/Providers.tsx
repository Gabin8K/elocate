import React, { FunctionComponent, PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SettingProvider from './SettingProvider';
import ThemeProvider from './ThemeProvider';
import ToastProvider from './ToastProvider';
import AuthProvider from './AuthProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from '@/components/ui/Toast';
import PortalProvider from './PortalProvider';
import 'react-native-reanimated';
import '@/locale/i18n';


const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <SettingProvider>
            <ThemeProvider>
              <ToastProvider>
                <PortalProvider>
                  {children}
                  <Toaster />
                </PortalProvider>
              </ToastProvider>
            </ThemeProvider>
          </SettingProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default Providers;