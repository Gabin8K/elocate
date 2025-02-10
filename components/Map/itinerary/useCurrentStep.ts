import { useMemo } from "react";
import { geocoding } from "@/services";
import { useLocation } from "@/hooks/useLocation";
import { ItineraryResult } from "../MapContext";
import { MapDirectionsResponse } from "react-native-maps-directions";


type CurrentStepProps = {
  steps: MapDirectionsResponse['legs'][number]['steps'];
  travelMode: ItineraryResult['travelMode'];
}


export function useCurrentStep(props: CurrentStepProps) {
  const { steps, travelMode } = props;

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
      if (travelMode === 'WALKING') {
        return distance >= 50 && distance <= 100;
      } else {
        return distance >= 100 && distance <= 200;
      }
    });
    return value;
  }, [location, steps, travelMode]);

  return currentStep;
}