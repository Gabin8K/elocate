import { spacing } from "@/theme/spacing";
import { FC, Fragment, memo, } from "react";
import { DropdownMenuPortal, DropdownMenuPortalProps } from "@/components/ui/dropdown";
import { SwitchInput, SwitchInputProps, TextInput, TextInputProps } from "@/components/ui";


export type CardSettingActionProps = {
  textInput?: TextInputProps;
  dropdownMenuPortal?: DropdownMenuPortalProps;
  switchInput?: SwitchInputProps;
}



export const CardSettingAction: FC<CardSettingActionProps> = memo(function CardSettingAction(props) {
  const { textInput, dropdownMenuPortal, switchInput } = props;

  return (
    <Fragment>
      {textInput ?
        <TextInput
          {...textInput}
        /> :
        null
      }
      {dropdownMenuPortal ?
        <DropdownMenuPortal
          point={{
            pageY: spacing.xxl,
          }}
          {...dropdownMenuPortal}
        /> :
        null
      }
      {switchInput ?
        <SwitchInput
          {...switchInput}
        /> :
        null
      }
    </Fragment>
  )
});