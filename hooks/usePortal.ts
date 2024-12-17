import { PortalContext } from "@/providers/PortalProvider";
import { useContext } from "react";

export function usePortal() {
  const portal = useContext(PortalContext);

  if (!portal) {
    throw new Error("usePortal must be used within a ThemeProvider")
  };
  return portal;
}