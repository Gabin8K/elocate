import { useLocation } from "@/hooks/useLocation";
import { reusableStyle } from "@/theme/reusables";
import { FC, memo } from "react";
import { StyleSheet, } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";



export const Map: FC = memo(function Map() {
  const location = useLocation();

  if (!location) return null;

  const initialRegion = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  return (
    <MapView
      initialRegion={initialRegion}
      onLongPress={(e) => console.log(e.nativeEvent.coordinate)}
      provider={PROVIDER_GOOGLE}
      style={styles.container}
    />
  );
})



const styles = StyleSheet.create({
  container: {
    ...reusableStyle.full
  },
})