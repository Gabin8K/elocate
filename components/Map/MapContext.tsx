import MapView, { Camera } from "react-native-maps";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useRef, useState } from "react";

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
  currentCamera?: Camera;
}

interface MapContextType {
  newPlace?: Place;
  openModal?: boolean;
  currentCamera?: Camera;
  mapRef: React.RefObject<MapView>;
  closePlace: () => void;
  closeModal: () => void;
  requestAddPlace: (place: Place) => void;
  confirmRequestPlace: () => void;
  setCurrentCamera: (currentCamera: Camera) => void;
}


export const MapContext = createContext<MapContextType>({
  mapRef: {} as MapContextType['mapRef'],
  requestAddPlace: () => { },
  closePlace: () => { },
  setCurrentCamera: () => { },
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
        open: false,
      }
    }));
  }, []);


  const confirmRequestPlace = useCallback(() => {
    setState(state => ({
      ...state,
      openModal: true,
      newPlace: {
        ...state.newPlace || {} as Place,
        open: false,
      },
    }));
  }, []);


  const closeModal = useCallback(() => {
    setState(state => ({
      ...state,
      openModal: false,
    }));
  }, []);


  const setCurrentCamera = useCallback((currentCamera: Camera) => {
    setState(state => ({
      ...state,
      currentCamera,
    }));
  }, []);


  return (
    <MapContext.Provider
      value={{
        mapRef,
        newPlace: state.newPlace,
        openModal: state.openModal,
        currentCamera: state.currentCamera,
        confirmRequestPlace,
        requestAddPlace,
        closePlace,
        closeModal,
        setCurrentCamera,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}