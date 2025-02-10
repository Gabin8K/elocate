import MapView from "react-native-maps";
import { Coordinate } from "@/services/types";
import { FC, Fragment, memo, RefObject } from "react";
import { INITIAL_CAMERA } from "./useInitialMapConfig";
import { Itinerary, ItineraryResult } from "./MapContext";
import { useHeading, useHeadingSensor } from "@/hooks/useLocation";


type MapMotionProps = {
  location?: Coordinate;
  mapRef: RefObject<MapView>;
  travelMode?: ItineraryResult['travelMode'];
  showTargetItinerary?: boolean;
  itineraryTarget?: Itinerary;
}

type ContentProps = {
  location?: Coordinate;
  mapRef: RefObject<MapView>;
  itineraryTarget: Coordinate;
  showTargetItinerary?: boolean;
}


export const MapMotion: FC<MapMotionProps> = memo(function MapMotion(props) {
  const { mapRef, location, travelMode, itineraryTarget, showTargetItinerary } = props;

  if (!itineraryTarget?.confirm) return null;

  return (
    <Fragment>
      {travelMode === 'WALKING' ?
        <MapMotionContentWalking
          mapRef={mapRef}
          location={location}
          showTargetItinerary={showTargetItinerary}
          itineraryTarget={itineraryTarget.place.coordinate}
        /> :
        <MapMotionContentDriving
          mapRef={mapRef}
          location={location}
          showTargetItinerary={showTargetItinerary}
          itineraryTarget={itineraryTarget.place.coordinate}
        />
      }
    </Fragment>
  );
})






const MapMotionContentWalking: FC<ContentProps> = memo(function MapMotionContentWalking(props) {
  const { mapRef, location, showTargetItinerary, itineraryTarget } = props;

  const heading = useHeading();

  if (!location) return null;

  const { latitude, longitude } = location;
  mapRef.current?.animateCamera(
    {
      center: showTargetItinerary ?
        itineraryTarget :
        {
          latitude,
          longitude
        },
      heading,
      pitch: INITIAL_CAMERA.pitch,
      zoom: 19,
    },
    { duration: 300 }
  );

  return null;
});







const MapMotionContentDriving: FC<ContentProps> = memo(function MapMotionContentDriving(props) {
  const { mapRef, location, showTargetItinerary, itineraryTarget } = props;

  const heading = useHeadingSensor();

  if (!location) return null;

  const { latitude, longitude } = location;
  mapRef.current?.animateCamera(
    {
      center: showTargetItinerary ?
        itineraryTarget :
        {
          latitude,
          longitude
        },
      heading,
      pitch: INITIAL_CAMERA.pitch,
      zoom: 19,
    },
    { duration: 300 }
  );

  return null;
});