import { places } from "./places";
import { geocoding } from "./geocoding";
import { Place } from "@/components/Map";
import { useLocale, useToast } from "@/hooks";
import { Coordinate, PlaceDoc } from "./types";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/providers/AuthProvider";
import { DropdownItem } from "@/components/ui/dropdown";
import { useCallback, useEffect, useState } from "react";
import { FormPlace } from "@/components/Map/place/modal/useFormPlace";


export function useAddressFromCoords(coords: Coordinate) {
  const toast = useToast();
  const { locale } = useLocale();

  const [data, setData] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    geocoding.getAddressFromCoords(coords, locale)
      .then((data) => setData(data))
      .catch((error) => toast.show(String(error.message || error), 'error'))
      .finally(() => setLoading(false));
  }, [])

  return {
    data,
    loading,
  };
}





export function useFormPlaceSubmit() {
  const toast = useToast();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (form: FormPlace) => {
    const { image, ...place } = form;
    setLoading(true);
    try {
      let imageRef = '';
      if (image) {
        const response = await places.uploadFile(image)
        imageRef = response.metadata.fullPath;
      }
      return await places.createPlace({
        userId: auth?.uid || '',
        ...place,
        imageRef,
      });
    } catch (error: any) {
      toast.show(String(error.message || error), 'error');
    }
    finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    onSubmit,
  }

}





export function useGetPlaces() {
  const toast = useToast();
  const [data, setData] = useState<PlaceDoc[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await places.getPlaces();
        setData(data);
      } catch (error: any) {
        toast.show(String(error.message || error), 'error');
      }
      finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])

  return {
    data,
    loading,
  }

}





export function useGetPlacesAround(radius: number) {
  const toast = useToast();
  const location = useLocation();

  const [data, setData] = useState<PlaceDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!location) return;
      try {
        const data = await geocoding.getCoordsWithinRadiusDirectly(location.coords, radius);
        setData(data);
      } catch (error: any) {
        toast.show(String(error.message || error), 'error');
      }
      finally {
        setLoading(false);
      }
    }
    fetch();
  }, [location, radius])

  return {
    data,
    loading,
  }
}



export function useValidationPlace(place: Place) {
  const toast = useToast();

  const [valid, setValid] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const hasPlace = await geocoding.checkIfPlaceExists(place.coordinate);
        setValid(!hasPlace);
      } catch (error: any) {
        toast.show(String(error.message || error), 'error');
      }
      finally {
        setLoading(false);
      }
    }
    fetch();
  }, [])


  return {
    valid,
    loading,
  }
}