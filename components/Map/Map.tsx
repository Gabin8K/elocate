import { useMap } from "./MapContext";
import { useLocation } from "@/hooks/useLocation";
import { reusableStyle } from "@/theme/reusables";
import { FC, Fragment, memo, useCallback } from "react";
import MapView, { Camera, LongPressEvent, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { MarkerCurrentPosition, MarkerPlace } from "./marker";
import { UserLocationButton } from "./UserLocationButton";




export const Map: FC = memo(function Map() {

  const location = useLocation();
  const map = useMap();

  const initialRegion: Region = {
    latitude: location?.coords.latitude || 0,
    longitude: location?.coords.longitude || 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }


  const initialCamera: Camera = {
    center: {
      latitude: location?.coords.latitude || 0,
      longitude: location?.coords.longitude || 0,
    },
    heading: 30,
    pitch: 60,
    zoom: 17,
  }


  const onLongPress = useCallback(({ nativeEvent }: LongPressEvent) => {
    const { center, ...camera } = initialCamera;
    map.mapRef.current?.animateCamera(camera, { duration: 500 });
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
  }, []);


  if (!location) return null;


  return (
    <Fragment>
      <MapView
        ref={map.mapRef}
        showsBuildings
        camera={initialCamera}
        initialRegion={initialRegion}
        onLongPress={onLongPress}
        provider={PROVIDER_GOOGLE}
        style={reusableStyle.full}
      >
        <MarkerPlace
          open={map.newPlace?.open}
          coordinate={map.newPlace?.coordinate}
        />
        <MarkerCurrentPosition
          coordinate={location.coords}
        />
      </MapView>
      <UserLocationButton
        mapRef={map.mapRef}
        camera={initialCamera}
      />
    </Fragment>
  );
});