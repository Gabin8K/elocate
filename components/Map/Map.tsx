import { useTheme } from "@/hooks";
import { useMap } from "./MapContext";
import { mapStyles } from "./map.styles";
import { LoadingMap } from "./LoadingMap";
import { useLocation } from "@/hooks/useLocation";
import { reusableStyle } from "@/theme/reusables";
import { useMapKey } from "@/providers/MapKeyProvider";
import { FC, Fragment, memo, useCallback } from "react";
import { UserLocationButton } from "./UserLocationButton";
import { useInitialCamera, useInitialRegion } from "./useInitialMapConfig";
import MapView, { Camera, LongPressEvent, PROVIDER_GOOGLE } from "react-native-maps";
import { ItineraryComponent, MarkerCurrentPosition, MarkerPlace, MarkerPlaceNearMe, RadiusCurrentPosition } from "./marker";




export const Map: FC = memo(function Map() {

  const map = useMap();
  const { key } = useMapKey();
  const { mode } = useTheme();
  const location = useLocation();

  const initialCamera = useInitialCamera(location?.coords);
  const initialRegion = useInitialRegion(location?.coords);


  const onLongPress = useCallback(({ nativeEvent }: LongPressEvent) => {
    const { coordinate } = nativeEvent;
    const camera: Camera = {
      ...initialCamera,
      center: {
        latitude: nativeEvent.coordinate.latitude,
        longitude: nativeEvent.coordinate.longitude,
      }
    };
    map.mapRef.current?.animateCamera(camera, { duration: 500 });
    map.requestAddPlace({ coordinate });
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
        toolbarEnabled={false}
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
          itinerary={map.itinerary}
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
          onItineraryReady={map.onItineraryReady}
        />
      </MapView>
      <UserLocationButton
        mapRef={map.mapRef}
        camera={initialCamera}
        hasItinerary={!!map.itinerary?.confirm}
      />
      <LoadingMap
        loading={map.loading}
      />
    </Fragment>
  );
});