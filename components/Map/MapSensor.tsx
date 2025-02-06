import { useMap } from "./MapContext";
import { DeviceMotion } from "expo-sensors";
import { useLocation } from "@/hooks/useLocation";
import MapView, { Camera } from "react-native-maps";
import { FC, memo, RefObject, useEffect, useState } from "react";


type ContentProps = {
  mapRef: RefObject<MapView>;
}


export const MapSensor: FC = memo(function MapSensor() {
  const map = useMap();

  if (!map.itinerary?.confirm) return null;

  return (
    <MapSensorContent
      mapRef={map.mapRef}
    />
  );
})





const MapSensorContent: FC<ContentProps> = memo(function MapSensorContent(props) {
  const { mapRef } = props;
  const location = useLocation();
  const [heading, setHeading] = useState(30);

  useEffect(() => {
    const subscribe = DeviceMotion.addListener((motion) => {
      const { beta } = motion.rotation;
      const heading = beta ? (beta * 180) / Math.PI : 30;
      setHeading(heading);
    })
    return () => {
      subscribe.remove();
    }
  }, []);


  useEffect(() => {
    if (!location) return;
    const { latitude, longitude } = location.coords;
    const camera: Camera = {
      center: {
        latitude,
        longitude,
      },
      heading,
      pitch: 60,
      zoom: 18,
    }
    mapRef.current?.animateCamera(camera, { duration: 500 });
  }, [location, heading]);


  return null;
});