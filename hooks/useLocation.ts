import { useToast } from "./useToast";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";


export function useLocation() {
  const toast = useToast();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let subscribe: Location.LocationSubscription | null = null;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.show('Permission to access location was denied');
        return;
      }

      subscribe = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1500,
      }, (location) => {
        setLocation(location);
      });
    })();

    return () => {
      subscribe?.remove();
    }
  }, []);

  return location;
}




export function useHeading(intialHeading: number = 30) {
  const [heading, setHeading] = useState(intialHeading);

  useEffect(() => {
    let subscribe: Location.LocationSubscription | null = null;
    (async () => {
      subscribe = await Location.watchHeadingAsync(({ trueHeading }) => {
        setHeading(trueHeading);
      });
    })();

    return () => {
      subscribe?.remove();
    }
  }, []);

  return heading;
}