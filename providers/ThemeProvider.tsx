import { Fragment, FunctionComponent, PropsWithChildren } from "react";
import { NavigationBar, StatusBar } from "@/components/ui";


const ThemeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <StatusBar />
      <NavigationBar />
      {children}
    </Fragment>
  )
}


export default ThemeProvider;