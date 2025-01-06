import { FC, memo } from "react";
import { IconButton } from "../../ui/buttons";


type InputMediaProps = {

}


export const InputMedia: FC<InputMediaProps> = memo(function InputMedia(props) {

  return (
    <IconButton
      icon={'camera'}
      variant={'primary'}
    />
  )
});