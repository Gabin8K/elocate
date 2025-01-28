import { FC, memo } from "react";
import { Itinerary } from "../MapContext";
import { useLocale, useTheme } from "@/hooks";
import { Coordinate } from "@/services/types";
import MapViewDirections from "react-native-maps-directions";


type ItineraryComponentProps = {
  radius: number;
  itinerary?: Itinerary;
  location?: Coordinate;
}


export const ItineraryComponent: FC<ItineraryComponentProps> = memo(function ItineraryComponent(props) {
  const { itinerary, location, radius } = props;

  const { colors } = useTheme();
  const { locale } = useLocale();

  const mode = radius <= 1 ? 'WALKING' : 'DRIVING';

  if (!location || !itinerary?.confirm) return null;

  return (
    <MapViewDirections
      mode={mode}
      origin={location}
      strokeWidth={1.5}
      language={locale}
      strokeColor={colors.primary}
      destination={itinerary.place.coordinate}
      apikey={process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY as string}
    />
  );
});