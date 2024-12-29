import { FC, memo } from "react";
import { useTheme } from "@/hooks";
import { Theme, typography } from "@/theme";
import { Text as RNText, TextProps } from "react-native";

type Props = TextProps & {
  variant?: keyof typeof typography,
  color?: keyof Theme['colors']
}

export const Text: FC<Props> = memo(function Text(props) {
  const { variant = 'body2', color = 'text', style, ...rest } = props;

  const { colors } = useTheme();

  const _style = typography[variant];
  const _color = colors[color];

  return (
    <RNText
      style={[
        _style,
        { color: _color },
        style
      ]}
      {...rest}
    />
  )
})