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
    if (!places.sharePlace?.id) return;
    share.launchHere(places.sharePlace?.id);
  }, [places.sharePlace]);


  const onGoogleMaps = useCallback(() => {
    if (!places.sharePlace) return;
    const { coordinate } = places.sharePlace;
    share.launchGoogleMaps({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  }, [places.sharePlace]);

  const onClose = useCallback(() => {
    places.setSharePlace(undefined);
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