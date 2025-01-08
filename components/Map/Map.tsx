import { useTheme } from "@/hooks";
import { useMap } from "./MapContext";
import { mapStyles } from "./map.styles";
import { useLocation } from "@/hooks/useLocation";
import { reusableStyle } from "@/theme/reusables";
import { FC, Fragment, memo, useCallback } from "react";
import { UserLocationButton } from "./UserLocationButton";
import { MarkerCurrentPosition, MarkerPlace } from "./marker";
import MapView, { Camera, LongPressEvent, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { LoadingMap } from "./LoadingMap";




export const Map: FC = memo(function Map() {

  const map = useMap();
  const { mode } = useTheme();
  const location = useLocation();

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



  const onRegionChangeComplete = useCallback(async () => {
    map.mapRef.current?.getCamera()
      .then(camera => map.setCurrentCamera(camera))
      .catch(console.error);
  }, []);



  if (!location) return null;


  return (
    <Fragment>
      <MapView
        showsBuildings
        ref={map.mapRef}
        minZoomLevel={14}
        camera={initialCamera}
        onLongPress={onLongPress}
        provider={PROVIDER_GOOGLE}
        style={reusableStyle.full}
        initialRegion={initialRegion}
        customMapStyle={mapStyles[mode]}
        onMapLoaded={map.onMapLoaded}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <MarkerPlace
          open={map.newPlace?.open}
          coordinate={map.newPlace?.coordinate}
        />
        <MarkerCurrentPosition
          coordinate={location.coords}
          currentCamera={map.currentCamera}
        />
      </MapView>
      <UserLocationButton
        mapRef={map.mapRef}
        camera={initialCamera}
      />
      <LoadingMap
        loading={map.loading}
      />
    </Fragment>
  );
});