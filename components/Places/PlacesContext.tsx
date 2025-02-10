import { PlaceDoc } from "@/services/types";
import { useGetPlacesMappedAround } from "@/services/hooks";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type State = {
  radius: number;
  itinerary?: PlaceDoc;
  sharePlace?: PlaceDoc;
}

interface PlacesContextType {
  radius: number;
  loading?: boolean;
  refreshing?: boolean;
  listOfPlaces: PlaceDoc[];
  itinerary?: PlaceDoc;
  sharePlace?: PlaceDoc;
  onFetch: () => void;
  onRadiusChange: (radius: number) => void;
  setSharePlace: (share?: PlaceDoc) => void;
  setItinerary: (itinary?: PlaceDoc) => void;
}

const initialValues: PlacesContextType = {
  radius: 2,
  listOfPlaces: [],
  onFetch: () => { },
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

  const { places, onFetch, loading } = useGetPlacesMappedAround(state.radius);

  const setItinerary = useCallback((itinerary?: PlaceDoc) => {
    setState((prev) => ({
      ...prev,
      itinerary,
    }));
  }, []);

  const setSharePlace = useCallback((sharePlace?: PlaceDoc) => {
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
        onFetch,
        setItinerary,
        setSharePlace,
        onRadiusChange,
        radius: state.radius,
        listOfPlaces: places,
        loading: loading?.loading,
        refreshing: loading?.refresh,
        itinerary: state.itinerary,
        sharePlace: state.sharePlace,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}