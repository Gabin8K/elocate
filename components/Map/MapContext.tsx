import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useRef, useState } from "react";
import MapView from "react-native-maps";

export type Point = {
  x: number;
  y: number;
}

export type Coordinate = {
  longitude: number;
  latitude: number;
}

export type Place = {
  open?: boolean;
  point: Point;
  coordinate: Coordinate;
}

type MapState = {
  newPlace?: Place;
  openModal?: boolean;
}

interface MapContextType {
  newPlace?: Place;
  openModal?: boolean;
  mapRef: React.RefObject<MapView>;
  closePlace: () => void;
  closeModal: () => void;
  requestAddPlace: (place: Place) => void;
  confirmRequestPlace: () => void;
}


export const MapContext = createContext<MapContextType>({
  mapRef: {} as MapContextType['mapRef'],
  requestAddPlace: () => { },
  closePlace: () => { },
  closeModal: () => { },
  confirmRequestPlace: () => { },
});


export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}



export const MapProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const mapRef = useRef<MapView>(null);
  const [state, setState] = useState<MapState>({});

  const requestAddPlace = useCallback((newPlace: Place) => {
    setState(state => ({
      ...state,
      newPlace: {
        ...newPlace,
        open: true
      }
    }));
  }, []);

  const closePlace = useCallback(() => {
    setState(state => ({
      ...state,
      newPlace: {
        ...state.newPlace || {} as Place,
        open: false
      }
    }));
  }, []);


  const confirmRequestPlace = useCallback(() => {
    setState(state => ({
      ...state,
      openModal: true,
      newPlace: {
        ...state.newPlace || {} as Place,
        open: false
      },
    }));
  }, []);


  const closeModal = useCallback(() => {
    setState(state => ({
      ...state,
      openModal: false
    }));
  }, []);


  return (
    <MapContext.Provider
      value={{
        mapRef,
        newPlace: state.newPlace,
        openModal: state.openModal,
        confirmRequestPlace,
        requestAddPlace,
        closePlace,
        closeModal
      }}
    >
      {children}
    </MapContext.Provider>
  )
}