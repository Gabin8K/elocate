import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { useToast } from "./useToast";


export function useLocation() {

  const toast = useToast();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.show('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
      });
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  return location;
}