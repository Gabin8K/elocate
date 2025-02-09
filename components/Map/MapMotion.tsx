import { useMap } from "./MapContext";
import MapView, { } from "react-native-maps";
import { Coordinate } from "@/services/types";
import { FC, Fragment, memo, RefObject } from "react";
import { INITIAL_CAMERA } from "./useInitialMapConfig";
import { useHeading, useHeadingSensor, useLocation } from "@/hooks/useLocation";



type ContentProps = {
  mapRef: RefObject<MapView>;
  itineraryTarget: Coordinate;
  showTargetItinerary?: boolean;
}


export const MapMotion: FC = memo(function MapMotion() {
  const map = useMap();

  if (!map.itinerary?.confirm) return null;

  return (
    <Fragment>
      {map.itineraryResult?.travelMode === 'WALKING' ?
        <MapMotionContentWalking
          mapRef={map.mapRef}
          showTargetItinerary={map.showTargetItinerary}
          itineraryTarget={map.itinerary.place.coordinate}
        /> :
        <MapMotionContentDriving
          mapRef={map.mapRef}
          showTargetItinerary={map.showTargetItinerary}
          itineraryTarget={map.itinerary.place.coordinate}
        />
      }
    </Fragment>
  );
})






const MapMotionContentWalking: FC<ContentProps> = memo(function MapMotionContentWalking(props) {
  const { mapRef, showTargetItinerary, itineraryTarget } = props;

  const location = useLocation();
  const heading = useHeading();

  if (!location) return null;

  const { latitude, longitude } = location.coords;
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
  const { mapRef, showTargetItinerary, itineraryTarget } = props;

  const location = useLocation();
  const heading = useHeadingSensor();

  if (!location) return null;

  const { latitude, longitude } = location.coords;
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