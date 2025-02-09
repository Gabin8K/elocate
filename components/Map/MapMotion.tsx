import { useMap } from "./MapContext";
import { FC, memo, RefObject } from "react";
import MapView, { } from "react-native-maps";
import { Coordinate } from "@/services/types";
import { INITIAL_CAMERA } from "./useInitialMapConfig";
import { useHeading, useLocation } from "@/hooks/useLocation";



type ContentProps = {
  mapRef: RefObject<MapView>;
  itineraryTarget: Coordinate;
  showTargetItinerary?: boolean;
}


export const MapMotion: FC = memo(function MapMotion() {
  const map = useMap();

  if (!map.itinerary?.confirm) return null;

  return (
    <MapMotionContent
      mapRef={map.mapRef}
      showTargetItinerary={map.showTargetItinerary}
      itineraryTarget={map.itinerary.place.coordinate}
    />
  );
})





const MapMotionContent: FC<ContentProps> = memo(function MapMotionContent(props) {
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