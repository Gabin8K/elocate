import { Keyboard } from "react-native";
import { Place } from "../../MapContext";
import { useCallback, useRef, useState } from "react";
import { Coordinate, File, PlaceDoc } from "@/services/types";
import { useAddressFromCoords, useFormPlaceSubmit } from "@/services/hooks";


export type FormPlace = {
  address: string;
  image: File | null;
  description: string;
  coordinate: Coordinate;
}


type FormState = {
  error?: boolean;
  placeDoc?: PlaceDoc;
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
  const placeDoc = state.placeDoc;


  const setValue = useCallback(<T extends keyof FormPlace>(key: T, value: FormPlace[T]) => {
    if (key === 'address') {
      setState(state => ({ ...state, error: false }));
    }
    formRef.current[key] = value;
  }, [])


  const handleSubmit = useCallback(async () => {
    if (!formRef.current.address) {
      setState(state => ({ ...state, error: true }));
      return;
    }
    Keyboard.dismiss();
    const placeDoc = await onSubmit(formRef.current);
    setState(state => ({ ...state, placeDoc }));
    return placeDoc;
  }, []);


  return {
    errors,
    loading,
    setValue,
    placeDoc,
    handleSubmit,
    dropdownItems,
  }

}