import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useHeaderBackHandler } from "@/components/layout/header/HeaderContext";


export function useBackhandler(handler: () => boolean) {
  useEffect(() => {
    const subscribe = BackHandler.addEventListener('hardwareBackPress', handler)

    return () => subscribe.remove();
  }, [handler])
}


export function useGlobalBackhandler(handler: () => boolean) {
  useBackhandler(handler);
  useHeaderBackHandler(handler);
}