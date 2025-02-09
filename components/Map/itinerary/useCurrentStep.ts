import { useMemo } from "react";
import { geocoding } from "@/services";
import { useLocation } from "@/hooks/useLocation";
import { MapDirectionsResponse } from "react-native-maps-directions";


export function useCurrentStep(steps: MapDirectionsResponse['legs'][number]['steps']) {
  const location = useLocation();

  const currentStep = useMemo(() => {
    if (!location) return steps[0];
    const value = steps.find(step => geocoding.calculateDistanceMeter(
      location.coords,
      {
        latitude: step.end_location.lat,
        longitude: step.end_location.lng,
      }
    ) < 50
    );
    return value || steps[0];
  }, [location, steps]);


  return currentStep;
}