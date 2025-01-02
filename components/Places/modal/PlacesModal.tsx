import { FC, Fragment, memo } from "react";
import { usePlaces } from "../PlacesContext";
import { PlaceItineraryModal } from "./PlaceItineraryModal";
import { SharePlaceModal } from "./SharePlaceModal";



export const PlacesModal: FC = memo(function PlacesModal() {
  const places = usePlaces();

  const openItinerary = !!places.itinerary;
  const openShare = !!places.sharePlace;

  return (
    <Fragment>
      {openItinerary ?
        <PlaceItineraryModal /> :
        openShare ?
          <SharePlaceModal /> :
          null
      }
    </Fragment>
  );
});