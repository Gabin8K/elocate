import i18n, { t } from "@/locale/i18n";
import { useSetting } from "./useSetting";

export function useLocale() {
  const { locale, setLocale } = useSetting();

  const changeLocale = (locale: string) => {
    i18n.locale = locale;
    setLocale(locale);
  }

  return {
    t,
    locale,
    changeLocale,
  }
}