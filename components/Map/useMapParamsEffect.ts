import { Itinerary } from "./MapContext";
import { useEffect, useMemo } from "react";
import { PlaceDoc } from "@/services/types";
import { useLocalSearchParams } from "expo-router";

type Params = {
  itinerary?: Itinerary;
}


export function useMapParamsEffect(callback: (params: Params) => void) {
  const params = useLocalSearchParams();

  const refresh = params.itinerary;

  const values = useMemo<Params>(() => {
    let itinerary: Itinerary | undefined = undefined;
    if (params.itinerary) {
      itinerary = {
        index: 0,
        open: false,
        confirm: true,
        place: JSON.parse(params.itinerary as string) as PlaceDoc,
      };
    }
    return {
      itinerary,
    };
  }, [params]);


  useEffect(() => {
    callback(values);
  }, [refresh]);

}