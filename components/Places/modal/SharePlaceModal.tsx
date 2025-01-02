import { FC, memo, useCallback } from "react";
import { usePlaces } from "../PlacesContext";
import { useShareCard } from "../card/useShareCard";
import { PlacesModalContent } from "./PlacesModalContent";



export const SharePlaceModal: FC = memo(function SharePlaceModal() {

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
      title={'Selectioner le lien de partage'}
      onClose={onClose}
      onHere={onHere}
      onGoogleMaps={onGoogleMaps}
    />
  );
});