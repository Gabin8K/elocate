import { FC, memo } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks";
import { Theme } from "@/theme";

type Props = React.ComponentProps<typeof ExpoStatusBar> & {
  color?: keyof Theme['colors']
};

export const StatusBar: FC<Props> = memo(function StatusBar(props) {
  const { color = 'background', ...rest } = props
  const { colors, mode } = useTheme()

  return (
    <ExpoStatusBar
      animated
      style={mode === 'light' ? 'dark' : 'light'}
      backgroundColor={colors[color]}
      {...rest}
    />
  )
})