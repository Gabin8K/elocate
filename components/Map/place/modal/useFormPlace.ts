import { Place } from "../../MapContext";
import { useCallback, useRef, useState } from "react";
import { Coordinate, File } from "@/services/types";
import { useAddressFromCoords, useFormPlaceSubmit } from "@/services/hooks";


export type FormPlace = {
  address: string;
  image: File | null;
  description: string;
  coordinate: Coordinate;
}




export function useFormPlace(place: Place) {

  const [errors, setErrors] = useState(true);
  const { onSubmit, loading } = useFormPlaceSubmit();
  const { data: dropdownItems } = useAddressFromCoords(place.coordinate);

  const formRef = useRef<FormPlace>({
    coordinate: {
      latitude: place.coordinate.latitude,
      longitude: place.coordinate.longitude
    },
    address: '',
    image: null,
    description: '',
  });


  const setValue = useCallback(<T extends keyof FormPlace>(key: T, value: FormPlace[T]) => {
    if (key === 'address') {
      setErrors(false);
    }
    formRef.current[key] = value;
  }, [])


  const handleSubmit = useCallback(async () => {
    await onSubmit(formRef.current)
  }, []);


  return {
    loading,
    setValue,
    handleSubmit,
    dropdownItems,
    errors,
  }

}