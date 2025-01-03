import { useSetting } from "@/hooks";
import { useMemo } from "react";
import { CardSettingProps } from "./card";


export function useSettingList() {
  const setting = useSetting();

  const settings = useMemo<CardSettingProps[]>(() => {
    return [
      {
        title: 'Theme',
        value: 'Dark',
        action: {
          switchInput: {
            checked: setting.mode === 'dark',
            onChecked: (value) => {
              setting.setMode(value ? 'dark' : 'light');
            }
          }
        }
      },
      {
        title: 'Language',
        value: setting.locale === 'en' ? 'English' : 'Français',
        action: {
          dropdownMenuPortal: {
            placeholder: 'Select language',
            onItemPress: (item) => {
              setting.setLocale(item.value);
            },
            dropdownItems: [
              {
                label: 'English',
                value: 'en',
              },
              {
                label: 'Français',
                value: 'fr',
              }
            ],
          }
        }
      }
    ]
  }, [setting]);


  return {
    settings,
  }
  
}