import { useToast } from "@/hooks";
import { useCallback } from "react";
import { Share } from "react-native";


type Location = {
  lat: number;
  lng: number;
}


export function useShareCard() {
  const toast = useToast();


  const launchHere = useCallback(async (placeId: string) => {
    const url = `elocal://place/${placeId}`;
    const message = `Découvrez ce lieu sur Easy Locate (Elocate): ${url}`;

    try {
      await Share.share({
        message,
        url,
      });
    } catch (err: any) {
      toast.show(`Erreur lors du partage: ${String(err.message || err)}`, 'error');
    }
  }, []);


  const launchGoogleMaps = useCallback(async (location: Location) => {
    const message = `http://maps.google.com/maps?q=loc:${location.lat},${location.lng}`;

    try {
      await Share.share({ message });
    } catch (err: any) {
      toast.show(`Erreur lors du partage: ${String(err.message || err)}`, 'error');
    }
  }, []);


  return {
    launchHere,
    launchGoogleMaps,
  }
}