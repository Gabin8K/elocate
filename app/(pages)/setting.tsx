import { Fragment } from "react";
import { HeaderSetting, SettingsList } from "@/components/Settings";
import { DropdownMenuPortalProvider } from "@/components/ui/dropdown";

export default function Page() {
  return (
    <Fragment>
      <HeaderSetting />
      <DropdownMenuPortalProvider>
        <SettingsList />
      </DropdownMenuPortalProvider>
    </Fragment>
  )
}