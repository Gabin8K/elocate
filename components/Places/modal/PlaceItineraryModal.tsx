import { useLocale } from "@/hooks";
import { router } from "expo-router";
import { Linking } from "react-native";
import { usePlaces } from "../PlacesContext";
import { FC, memo, useCallback } from "react";
import { PlacesModalContent } from "./PlacesModalContent";



export const PlaceItineraryModal: FC = memo(function PlaceItineraryModal() {

  const { t } = useLocale();
  const places = usePlaces();

  const open = !!places.itinerary;

  const onHere = useCallback(() => {
    places.setItinerary(undefined);
    router.navigate({
      pathname: '/(tabs)',
      params: {
        refresh: String(Date.now()),
        itinerary: JSON.stringify(places.itinerary)
      }
    });
  }, [places.itinerary]);


  const onGoogleMaps = useCallback(() => {
    if (!places.itinerary) return;
    const { latitude, longitude } = places.itinerary.coordinate;
    places.setItinerary(undefined);
    Linking.openURL(`http://maps.google.com/maps?q=loc:${latitude},${longitude}`);
  }, [places.itinerary]);

  const onClose = useCallback(() => {
    places.setItinerary(undefined);
  }, []);


  return (
    <PlacesModalContent
      open={open}
      onHere={onHere}
      onClose={onClose}
      onGoogleMaps={onGoogleMaps}
      title={t('place-modal-itinerary-title')}
    />
  );
});