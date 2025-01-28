import { useTheme } from "@/hooks";
import { useMap } from "./MapContext";
import { mapStyles } from "./map.styles";
import { LoadingMap } from "./LoadingMap";
import { useLocation } from "@/hooks/useLocation";
import { reusableStyle } from "@/theme/reusables";
import { useMapKey } from "@/providers/MapKeyProvider";
import { FC, Fragment, memo, useCallback } from "react";
import { UserLocationButton } from "./UserLocationButton";
import MapView, { Camera, LongPressEvent, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { ItineraryComponent, MarkerCurrentPosition, MarkerPlace, MarkerPlaceNearMe, RadiusCurrentPosition } from "./marker";




export const Map: FC = memo(function Map() {

  const map = useMap();
  const { key } = useMapKey();
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




  return (
    <Fragment>
      <MapView
        key={key}
        showsBuildings
        ref={map.mapRef}
        minZoomLevel={13}
        showsCompass={false}
        camera={initialCamera}
        onLongPress={onLongPress}
        provider={PROVIDER_GOOGLE}
        style={reusableStyle.full}
        showsMyLocationButton={false}
        initialRegion={initialRegion}
        onMapLoaded={map.onMapLoaded}
        customMapStyle={mapStyles[mode]}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <MarkerPlace
          open={map.newPlace?.open}
          coordinate={map.newPlace?.coordinate}
        />
        <MarkerCurrentPosition
          coordinate={location?.coords}
          currentCamera={map.currentCamera}
        />
        <RadiusCurrentPosition
          radius={map.radius}
          coordinate={location?.coords}
          currentCamera={map.currentCamera}
        />
        <MarkerPlaceNearMe
          places={map.places}
          requestItinerary={map.requestItinerary}
        />
        <ItineraryComponent
          radius={map.radius}
          itinerary={map.itinerary}
          location={location?.coords}
          closeItinerary={map.closeItinerary}
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