import { useMemo } from "react";
import { geocoding } from "@/services";
import { useLocation } from "@/hooks/useLocation";
import { MapDirectionsResponse } from "react-native-maps-directions";


export function useCurrentStep(steps: MapDirectionsResponse['legs'][number]['steps']) {
  const location = useLocation();

  const currentStep = useMemo(() => {
    if (!location) return;
    const value = steps.find(step => {
      const distance = geocoding.calculateDistanceMeter(
        location.coords,
        {
          latitude: step.end_location.lat,
          longitude: step.end_location.lng,
        }
      );
      return distance >= 50 && distance <= 100;
    });
    return value;
  }, [location, steps]);

  return currentStep;
}