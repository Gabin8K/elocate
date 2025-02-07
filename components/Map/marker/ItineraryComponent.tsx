import { FC, memo } from "react";
import { Itinerary } from "../MapContext";
import { palette } from "@/theme/palette";
import { Coordinate } from "@/services/types";
import { useBackhandler, useLocale } from "@/hooks";
import MapViewDirections, { MapDirectionsResponse } from "react-native-maps-directions";


type RenderItitneraryProps = Required<ItineraryComponentProps>;
type ItineraryComponentProps = {
  radius: number;
  itinerary?: Itinerary;
  location?: Coordinate;
  closeItinerary: () => void;
  onItineraryReady?: (...result: MapDirectionsResponse[]) => void;
}



export const ItineraryComponent: FC<ItineraryComponentProps> = memo(function ItineraryComponent(props) {
  const { itinerary, location, radius, closeItinerary, onItineraryReady } = props;

  if (!location || !itinerary?.confirm) return null;

  return (
    <RenderItitnerary
      itinerary={itinerary}
      location={location}
      radius={radius}
      closeItinerary={closeItinerary}
      onItineraryReady={onItineraryReady || (() => { })}
    />
  );
});





const RenderItitnerary: FC<RenderItitneraryProps> = memo(function RenderItitnerary(props) {
  const { itinerary, location, radius, closeItinerary, onItineraryReady } = props;

  const { locale } = useLocale();

  const mode = radius < 1 ? 'WALKING' : 'DRIVING';

  useBackhandler(() => {
    if (itinerary) {
      closeItinerary();
      return true;
    }
    return false;
  });


  return (
    <MapViewDirections
      mode={mode}
      origin={location}
      strokeWidth={4}
      language={locale}
      onReady={onItineraryReady}
      strokeColor={palette.light.primary}
      destination={itinerary.place.coordinate}
      apikey={process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string}
    />
  )
})