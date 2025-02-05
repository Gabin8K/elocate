import { FC, memo } from "react";
import { useLocale } from "@/hooks";
import { Text } from "@/components/ui";
import { display } from "@/utils/formater";
import { CommentDoc } from "@/services/types";


type FormReplyProps = {
  reply?: CommentDoc;
}


export const FormReply: FC<FormReplyProps> = memo(function FormReply(props) {
  const { reply } = props;

  const { t } = useLocale();

  return (
    <Text>
      {t('experience-input-reply-title')}
      <Text
        variant={'body2_m'}
      >
        {' '}{display(reply?.user?.displayName ?? '', 20)}
      </Text>
    </Text>
  );
});