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
    places.setItinerary(null);
    router.navigate('/(tabs)');
  }, []);


  const onGoogleMaps = useCallback(() => {
    places.setItinerary(null);
    const title = 'Itinéraire Easy Locate (Elocate)';
    Linking.openURL(`http://maps.google.com/maps?q=loc:${37.484847},${-122.148386} (${title})`);
  }, []);

  const onClose = useCallback(() => {
    places.setItinerary(null);
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