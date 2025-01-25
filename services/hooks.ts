import { places } from "./places";
import { Coordinate } from "./types";
import { geocoding } from "./geocoding";
import { useLocale, useToast } from "@/hooks";
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
      await places.createPlace({
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