import { useToast } from "./useToast";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";


export function useLocation() {

  const toast = useToast();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.show('Permission to access location was denied');
        return;
      }

      await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 2500,
      }, (location) => {
        setLocation(location);
      });
    })();

    return () => {
      Location.stopLocationUpdatesAsync('location');
    }
  }, []);
  return location;
}