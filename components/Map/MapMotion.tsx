import { useMap } from "./MapContext";
import { FC, memo, RefObject } from "react";
import MapView, { } from "react-native-maps";
import { Coordinate } from "@/services/types";
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
  const heading = useHeading(30);

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
      pitch: 60,
      zoom: 18,
    },
    { duration: 300 }
  );

  return null;
});