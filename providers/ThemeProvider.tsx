import { Fragment, FunctionComponent, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationBar, StatusBar } from "@/components/ui";
import { useSetting } from "@/hooks";
import theme from "@/theme";


const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const setting = useSetting()

  const value = theme[setting.mode]

  return (
    <Fragment>
      <StatusBar />
      <NavigationBar />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: value.colors.background
        }}
      >
        {children}
      </SafeAreaView>
    </Fragment>
  )
}


export default ThemeProvider;