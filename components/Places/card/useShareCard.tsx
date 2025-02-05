import { useCallback } from "react";
import { Share } from "react-native";
import { useLocale, useToast } from "@/hooks";
import { Coordinate } from "@/services/types";


export function useShareCard() {
  const toast = useToast();
  const { t } = useLocale();

  const launchHere = useCallback(async (placeId: string) => {
    const url = `elocate://uri?place-id=${placeId}`;
    const message = url;
    try {
      await Share.share({
        url,
        message,
      });
    } catch (err: any) {
      toast.show(`${t('error-sharing')} ${String(err.message || err)}`, 'error');
    }
  }, [t]);


  const launchGoogleMaps = useCallback(async (location: Coordinate) => {
    const message = `http://maps.google.com/maps?q=loc:${location.latitude},${location.longitude}`;
    try {
      await Share.share({ message });
    } catch (err: any) {
      toast.show(`${t('error-sharing')} ${String(err.message || err)}`, 'error');
    }
  }, [t]);


  return {
    launchHere,
    launchGoogleMaps,
  }
}