import { useFonts } from "expo-font";
import { fonts } from "@/theme/typography";
import { defaultLocale } from "@/locale/i18n";
import { useColorScheme } from "react-native";
import { AsyncStorageGetItem, AsyncStorageSetItem } from "@/utils/storage";
import { FunctionComponent, PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";


export interface Setting {
  mode: 'light' | 'dark';
  locale: string;
  hasInitialized: boolean;
}

export interface SettingCtx extends Setting {
  setLocale: (locale: string) => void;
  setMode: (mode: SettingCtx['mode']) => void;
  setHasInitialized: (hasInitialized: boolean) => void;
}


export const SettingContext = createContext<SettingCtx>({} as SettingCtx);


const SettingProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const schema = useColorScheme();

  const [fontsLoaded] = useFonts(fonts);
  const [setting, setSetting] = useState<Setting>({
    locale: 'en',
    mode: 'light',
    hasInitialized: false
  })

  const setLocale = useCallback((locale: string) => {
    setSetting((prev) => ({
      ...prev,
      locale
    }))
  }, [])

  const setMode = useCallback((mode: Setting['mode']) => {
    setSetting((prev) => ({
      ...prev,
      mode
    }))
  }, [])

  const setHasInitialized = useCallback((hasInitialized: boolean) => {
    setSetting((prev) => ({
      ...prev,
      hasInitialized
    }))
  }, [])


  const saveSetting = useCallback(async () => {
    if (Object.keys(setting).length === 0) return;
    await AsyncStorageSetItem('setting', setting)
  }, [setting])


  useEffect(() => {
    const launchSetting = async () => {
      const setting = await AsyncStorageGetItem<Setting>('setting')
      if (setting) {
        setSetting(setting)
        defaultLocale(setting.locale)
      } else {
        setMode(schema || 'light');
      }
    }
    launchSetting()
  }, [])


  useEffect(() => {
    saveSetting()
  }, [setting])


  if (!fontsLoaded) {
    return null;
  }


  return (
    <SettingContext.Provider
      value={{
        ...setting,
        setLocale,
        setMode,
        setHasInitialized
      }}
    >
      {children}
    </SettingContext.Provider>
  )
}

export default SettingProvider;