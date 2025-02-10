import { API_KEY } from "@/services";
import { palette } from "@/theme/palette";
import { Polyline } from "react-native-maps";
import { Coordinate } from "@/services/types";
import { useBackhandler, useLocale } from "@/hooks";
import { Itinerary, ItineraryResult } from "../MapContext";
import { FC, Fragment, memo, useCallback, useState } from "react";
import MapViewDirections, { MapDirectionsResponse } from "react-native-maps-directions";


type RenderItitneraryProps = Required<ItineraryComponentProps>;
type ItineraryComponentProps = {
  travelMode: ItineraryResult['travelMode'];
  itinerary?: Itinerary;
  location?: Coordinate;
  closeItinerary: () => void;
  onItineraryReady?: (result: MapDirectionsResponse) => void;
}



export const ItineraryComponent: FC<ItineraryComponentProps> = memo(function ItineraryComponent(props) {
  const { itinerary, location, travelMode, closeItinerary, onItineraryReady } = props;

  if (!location || !itinerary?.confirm) return null;

  return (
    <RenderItitnerary
      itinerary={itinerary}
      location={location}
      travelMode={travelMode}
      closeItinerary={closeItinerary}
      onItineraryReady={onItineraryReady || (() => { })}
    />
  );
});





const RenderItitnerary: FC<RenderItitneraryProps> = memo(function RenderItitnerary(props) {
  const { itinerary, location, travelMode, closeItinerary, onItineraryReady } = props;

  const { locale } = useLocale();
  const [route, setRoute] = useState<Coordinate[]>([]);


  const onReady = useCallback((...e: MapDirectionsResponse[]) => {
    setRoute(e[0].coordinates);
    onItineraryReady(e[0]);
  }, []);

  useBackhandler(() => {
    if (itinerary) {
      closeItinerary();
      return true;
    }
    return false;
  });


  return (
    <Fragment>
      <MapViewDirections
        mode={travelMode}
        origin={location}
        strokeWidth={4}
        language={locale}
        onReady={onReady}
        strokeColor={palette.light.primary}
        destination={itinerary.place.coordinate}
        apikey={API_KEY}
      />
      {route.length > 0 ?
        < Polyline
          strokeWidth={4}
          coordinates={route}
          strokeColor={palette.light.primary}
        /> :
        null
      }
    </Fragment>
  )
})