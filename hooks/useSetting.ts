import React from "react";
import { SettingContext } from "@/providers/SettingProvider";


export function useSetting() {
  const context = React.useContext(SettingContext);
  if (!context) {
    throw new Error('useSetting must be used within a SettingProvider');
  }
  return context;
}