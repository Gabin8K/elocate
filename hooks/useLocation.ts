import { useToast } from "./useToast";
import * as Location from 'expo-location';
import { DeviceMotion } from "expo-sensors";
import { useEffect, useRef, useState } from "react";


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
        timeInterval: 1000,
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






export function useHeading() {

  const [heading, setHeading] = useState(0);
  const headingHistory = useRef<number[]>([]).current;

  useEffect(() => {
    let subscribe: Location.LocationSubscription | null = null;
    (async () => {
      subscribe = await Location.watchHeadingAsync(({ trueHeading }) => {
        headingHistory.push(trueHeading);
        if (headingHistory.length > 5) headingHistory.shift();

        const smoothHeading = headingHistory.reduce((acc, curr) => acc + curr, 0) / headingHistory.length;
        setHeading(smoothHeading);
      });
    })();

    return () => {
      subscribe?.remove();
    }
  }, []);

  return heading;
}








export function useHeadingSensor() {

  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const subscribe = DeviceMotion.addListener((event) => {
      const { alpha } = event.rotation;

      let heading = 360 - (alpha * (180 / Math.PI));
      if(heading < 0) heading += 360;
      if(heading > 360) heading -= 360;

      setHeading(heading);

    });

    return () => {
      subscribe.remove();
    }
  }, []);

  return heading;
}