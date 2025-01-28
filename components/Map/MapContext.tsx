import MapView, { Camera } from "react-native-maps";
import { useGetPlacesAround } from "@/services/hooks";
import { Coordinate, PlaceDoc } from "@/services/types";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useRef, useState } from "react";


export type Place = {
  open?: boolean;
  coordinate: Coordinate;
}

export type Itinerary = {
  open?: boolean;
  index: number;
  place: PlaceDoc;
  confirm?: boolean;
}


type MapState = {
  newPlace?: Place;
  itinerary?: Itinerary;
  openModal?: boolean;
  loading: boolean;
  radius: number;
  currentCamera?: Camera;
}

interface MapContextType {
  loading: boolean;
  newPlace?: Place;
  openModal?: boolean;
  itinerary?: Itinerary;
  currentCamera?: Camera;
  mapRef: React.RefObject<MapView>;
  radius: number;
  places: PlaceDoc[];
  loadingPlaces: boolean;
  closePlace: () => void;
  closeItinerary: () => void;
  onMapLoaded: () => void;
  closeModal: () => void;
  requestAddPlace: (place: Place) => void;
  requestItinerary: (itinerary: Itinerary) => void;
  onRadiusChange: (value: number) => void;
  confirmRequestPlace: () => void;
  confirmRequestItinerary: () => void;
  setCurrentCamera: (currentCamera: Camera) => void;
}


const initialValue: MapContextType = {
  loading: true,
  loadingPlaces: true,
  radius: 2,
  places: [],
  mapRef: {} as MapContextType['mapRef'],
  requestAddPlace: () => { },
  closePlace: () => { },
  setCurrentCamera: () => { },
  closeModal: () => { },
  onMapLoaded: () => { },
  confirmRequestPlace: () => { },
  onRadiusChange: () => { },
  closeItinerary: () => { },
  requestItinerary: () => { },
  confirmRequestItinerary: () => { },
}


export const MapContext = createContext<MapContextType>(initialValue);


export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}



export const MapProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const mapRef = useRef<MapView>(null);
  const [state, setState] = useState<MapState>(initialValue);

  const near = useGetPlacesAround(state.radius);

  const requestAddPlace = useCallback((newPlace: Place) => {
    setState(state => ({
      ...state,
      newPlace: {
        ...newPlace,
        open: true
      }
    }));
  }, []);

  const requestItinerary = useCallback((itinerary: Itinerary) => {
    setState(state => ({
      ...state,
      itinerary: {
        ...itinerary,
        open: true,
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



  const confirmRequestItinerary = useCallback(() => {
    setState(state => ({
      ...state,
      itinerary: {
        ...state.itinerary || {} as Itinerary,
        open: false,
        confirm: true,
      },
    }));
  }, []);


  const closeModal = useCallback(() => {
    setState(state => ({
      ...state,
      openModal: false,
      newPlace: undefined,
    }));
  }, []);


  const setCurrentCamera = useCallback((currentCamera: Camera) => {
    setState(state => ({
      ...state,
      currentCamera,
    }));
  }, []);


  const onMapLoaded = useCallback(() => {
    setState(state => ({
      ...state,
      loading: false,
    }));
  }, []);


  const onRadiusChange = useCallback((radius: number) => {
    setState(state => ({
      ...state,
      radius,
    }));
  }, []);


  const closeItinerary = useCallback(() => {
    setState(state => ({
      ...state,
      itinerary: undefined,
    }));
  }, []);



  return (
    <MapContext.Provider
      value={{
        mapRef,
        loading: state.loading,
        newPlace: state.newPlace,
        openModal: state.openModal,
        radius: state.radius,
        places: near.places,
        itinerary: state.itinerary,
        loadingPlaces: near.loading,
        currentCamera: state.currentCamera,
        confirmRequestPlace,
        requestAddPlace,
        closePlace,
        closeModal,
        setCurrentCamera,
        onMapLoaded,
        onRadiusChange,
        closeItinerary,
        requestItinerary,
        confirmRequestItinerary,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}