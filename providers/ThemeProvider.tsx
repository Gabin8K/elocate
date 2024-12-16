import { Fragment, FunctionComponent, PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSetting } from "@/hooks";
import theme from "@/theme";
import { NavigationBar } from "@/components/ui";


const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const setting = useSetting()

  const value = theme[setting.mode]

  return (
    <Fragment>
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