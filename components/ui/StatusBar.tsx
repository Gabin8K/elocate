import { FC, memo } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Theme } from "@/theme";
import { useTheme } from "@/hooks";

type Props = React.ComponentProps<typeof ExpoStatusBar> & {
  color?: keyof Theme['colors']
};

export const StatusBar: FC<Props> = memo(function StatusBar(props) {
  const { color = 'transparent', ...rest } = props
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