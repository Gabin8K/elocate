import { FunctionComponent } from "react";
import { reusableStyle } from "@/theme/reusables";
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from "react-native";


export const KeyboardAvoidingViewProvider: FunctionComponent<KeyboardAvoidingViewProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={reusableStyle.flex}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  )
}