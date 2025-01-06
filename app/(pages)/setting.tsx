import { Fragment } from "react";
import { HeaderSetting, SettingsList } from "@/components/Settings";
import { DropdownMenuPortalProvider } from "@/components/ui/dropdown";


export default function SettingPage() {
  return (
    <Fragment>
      <HeaderSetting />
      <DropdownMenuPortalProvider>
        <SettingsList />
      </DropdownMenuPortalProvider>
    </Fragment>
  )
}