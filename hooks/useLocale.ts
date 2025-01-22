import i18n from "@/locale/i18n";
import { useSetting } from "./useSetting";

export function useLocale() {
  const { locale, setLocale } = useSetting();
  
  i18n.locale = locale;
  const t = i18n.t.bind(i18n);

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