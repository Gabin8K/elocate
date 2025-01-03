import { useMap } from "./MapContext";
import { useLocation } from "@/hooks/useLocation";
import { reusableStyle } from "@/theme/reusables";
import { FC, memo, PropsWithChildren } from "react";
import MapView, { LongPressEvent, PROVIDER_GOOGLE } from "react-native-maps";



export const Map: FC<PropsWithChildren> = memo(function Map({ children }) {

  const location = useLocation();
  const map = useMap();

  if (!location) return null;

  const initialRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const onLongPress = ({ nativeEvent }: LongPressEvent) => {
    map.requestAddPlace({
      point: {
        x: nativeEvent.position.x,
        y: nativeEvent.position.y
      },
      coordinate: {
        latitude: nativeEvent.coordinate.latitude,
        longitude: nativeEvent.coordinate.longitude
      }
    });
  }

  return (
    <MapView
      initialRegion={initialRegion}
      onLongPress={onLongPress}
      provider={PROVIDER_GOOGLE}
      style={reusableStyle.full}
    >
      {children}
    </MapView>
  );
});