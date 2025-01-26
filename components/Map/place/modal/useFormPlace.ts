import { Keyboard } from "react-native";
import { Place } from "../../MapContext";
import { Coordinate, File } from "@/services/types";
import { useCallback, useRef, useState } from "react";
import { useAddressFromCoords, useFormPlaceSubmit } from "@/services/hooks";


export type FormPlace = {
  address: string;
  image: File | null;
  description: string;
  coordinate: Coordinate;
}


type FormState = {
  error?: boolean;
  resultId?: string;
}



export function useFormPlace(place: Place) {

  const [state, setState] = useState<FormState>({});

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

  const errors = state.error;
  const resultId = state.resultId;


  const setValue = useCallback(<T extends keyof FormPlace>(key: T, value: FormPlace[T]) => {
    if (key === 'address') {
      setState(state => ({ ...state, error: false }));
    }
    formRef.current[key] = value;
  }, [])


  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();
    const resultId = await onSubmit(formRef.current)
    setState(state => ({ ...state, resultId }));
  }, []);


  return {
    errors,
    loading,
    setValue,
    resultId,
    handleSubmit,
    dropdownItems,
  }

}