/* eslint-disable @typescript-eslint/no-unused-vars */

import { places } from "@/services";
import { useCallback, useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";


type GlobalParams = {
  uri: 'place' | 'map';
  ['place-id']: string;
}



export function useAppUri() {

  const params = useGlobalSearchParams<GlobalParams>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const goBack = () => {
    router.replace('/(tabs)');
  }

  const fetchPlace = useCallback(async (placeId: string) => {
    try {
      const place = await places.getPlace(placeId);
      if (!place) throw new Error('Place not found');
      router.replace({
        pathname: '/(tabs)',
        params: {
          itinerary: JSON.stringify(place)
        }
      })
    } catch (error: any) {
      setError(true);
    }
    finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (params["place-id"]) {
      fetchPlace(params["place-id"]);
    }
  }, [params.uri]);


  return {
    loading,
    error,
    goBack,
  }
}