import { FC, memo } from "react";
import { useLocale } from "@/hooks";
import { Text } from "@/components/ui";


export const FormExperience: FC = memo(function FormExperience() {
  const { t } = useLocale();

  return (
    <Text>
      {t('experience-input-reply-title')}
      <Text
        variant={'body2_m'}
      >
        {' '}Gabin
      </Text>
    </Text>
  )
});