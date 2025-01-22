import { useLocale } from "@/hooks";
import { usePlaces } from "../PlacesContext";
import { FC, memo, useCallback } from "react";
import { useShareCard } from "../card/useShareCard";
import { PlacesModalContent } from "./PlacesModalContent";



export const SharePlaceModal: FC = memo(function SharePlaceModal() {

  const { t } = useLocale();
  const places = usePlaces();
  const share = useShareCard();

  const open = !!places.sharePlace;

  const onHere = useCallback(() => {
    share.launchHere(places.sharePlace);
  }, [places.sharePlace]);


  const onGoogleMaps = useCallback(() => {
    share.launchGoogleMaps({
      lat: 37.484847,
      lng: -122.148386,
    });
  }, []);

  const onClose = useCallback(() => {
    places.setSharePlace(null);
  }, []);


  return (
    <PlacesModalContent
      open={open}
      onHere={onHere}
      onClose={onClose}
      onGoogleMaps={onGoogleMaps}
      title={t('place-modal-share-title')}
    />
  );
});