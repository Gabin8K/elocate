import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type NearMeState = {
  open?: boolean;
}

interface MapContextType {
  open?: boolean;
  setOpen: (open: boolean) => void;
}


export const MapContext = createContext<MapContextType>({
  setOpen: () => { }
});


export const useNearMe = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useNearContext must be used within a MapProvider');
  }
  return context;
}


export const NearMeProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<NearMeState>({});

  const setOpen = useCallback((open: boolean) => {
    setState({ open });
  },[]);


  return (
    <MapContext.Provider
      value={{
        open: state.open,
        setOpen,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}