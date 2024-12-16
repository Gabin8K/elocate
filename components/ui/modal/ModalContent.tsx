import React, { FC, memo, } from 'react';
import { View, ViewProps } from 'react-native';



export const ModalContent: FC<ViewProps> = memo(function ModalContent(props) {
  const { children, style, ...rest } = props;

  return (
    <View
      style={[style]}
      {...rest}
    >
      {children}
    </View>
  )
});