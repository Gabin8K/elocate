import { useMemo } from "react";
import { CardSettingProps } from "./card";
import { display } from "@/utils/formater";
import { useLocale, useSetting } from "@/hooks";


export function useSettingList() {
  const { t } = useLocale();
  const setting = useSetting();

  const settings = useMemo<CardSettingProps[]>(() => {
    return [
      {
        title: t('setting-screen-theme-title'),
        value: t('setting-screen-theme-dark'),
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
        title: t('setting-screen-language-title'),
        value: setting.locale === 'en' ? t('english') : t('french'),
        action: {
          dropdownMenuPortal: {
            placeholder: display(t('setting-screen-language-placeholder'), 20),
            onItemPress: (item) => {
              setting.setLocale(item.value);
            },
            dropdownItems: [
              {
                label: t('english'),
                value: 'en',
              },
              {
                label: t('french'),
                value: 'fr',
              }
            ],
          }
        }
      }
    ]
  }, [setting, t]);


  return {
    settings,
  }

}