import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type State = {
  itinerary?: Itinenary;
  sharePlace?: SharePlace;
}

type Itinenary = any;
type SharePlace = any;

interface PlacesContextType {
  itinerary?: Itinenary;
  sharePlace?: SharePlace;
  setSharePlace: (share?: SharePlace) => void;
  setItinerary: (itinary?: Itinenary) => void;
}


export const PlacesContext = createContext<PlacesContextType>({
  setSharePlace: () => { },
  setItinerary: () => { }
});


export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context) {
    throw new Error('usePlaces must be used within a PlacesProvider');
  }
  return context;
}



export const PlacesProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<State>({});

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


  return (
    <PlacesContext.Provider
      value={{
        setItinerary,
        setSharePlace,
        itinerary: state.itinerary,
        sharePlace: state.sharePlace,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}