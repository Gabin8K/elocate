import { PlaceDoc } from "@/services/types";
import { useGetPlacesMappedAround } from "@/services/hooks";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type State = {
  radius: number;
  itinerary?: Itinenary;
  sharePlace?: SharePlace;
}

type Itinenary = any;
type SharePlace = any;

interface PlacesContextType {
  radius: number;
  loading?: boolean;
  listOfPlaces: PlaceDoc[];
  itinerary?: Itinenary;
  sharePlace?: SharePlace;
  onRadiusChange: (radius: number) => void;
  setSharePlace: (share?: SharePlace) => void;
  setItinerary: (itinary?: Itinenary) => void;
}

const initialValues: PlacesContextType = {
  radius: 2,
  listOfPlaces: [],
  setSharePlace: () => { },
  setItinerary: () => { },
  onRadiusChange: () => { },
}


export const PlacesContext = createContext<PlacesContextType>(initialValues);


export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error('usePlaces must be used within a PlacesProvider');
  }
  return context;
}



export const PlacesProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<State>(initialValues);

  const { places, loading } = useGetPlacesMappedAround(state.radius);

  const setItinerary = useCallback((itinerary?: Itinenary) => {
    setState((prev) => ({
      ...prev,
      itinerary,
    }));
  }, []);

  const setSharePlace = useCallback((sharePlace?: any) => {
    setState((prev) => ({
      ...prev,
      sharePlace,
    }));
  }, []);


  const onRadiusChange = useCallback((radius: number) => {
    setState((prev) => ({
      ...prev,
      radius,
    }));
  }, []);


  return (
    <PlacesContext.Provider
      value={{
        loading,
        setItinerary,
        setSharePlace,
        onRadiusChange,
        radius: state.radius,
        listOfPlaces: places,
        itinerary: state.itinerary,
        sharePlace: state.sharePlace,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}