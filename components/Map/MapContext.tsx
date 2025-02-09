import { geocoding } from "@/services";
import MapView, { Camera } from "react-native-maps";
import { useGetPlacesAround } from "@/services/hooks";
import { INITIAL_CAMERA } from "./useInitialMapConfig";
import { Coordinate, PlaceDoc } from "@/services/types";
import { useMapParamsEffect } from "./useMapParamsEffect";
import { MapDirectionsResponse } from "react-native-maps-directions";
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


export type ItineraryResult = {
  result?: MapDirectionsResponse;
  travelMode: 'DRIVING' | 'WALKING';
}


type MapState = {
  newPlace?: Place;
  itinerary?: Itinerary;
  itineraryResult?: ItineraryResult;
  openModal?: boolean;
  loading: boolean;
  radius: number;
  currentCamera?: Camera;
  showTargetItinerary?: boolean;
}

interface MapContextType {
  loading: boolean;
  newPlace?: Place;
  openModal?: boolean;
  itinerary?: Itinerary;
  itineraryResult?: ItineraryResult;
  currentCamera?: Camera;
  mapRef: React.RefObject<MapView>;
  radius: number;
  places: PlaceDoc[];
  loadingPlaces: boolean;
  showTargetItinerary?: boolean;
  toggleTravelMode: () => void;
  toggleTargetItinerary: () => void;
  onItineraryReady: (...result: MapDirectionsResponse[]) => void;
  addPlace: (place: PlaceDoc, location: Coordinate) => void;
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
  radius: 1,
  places: [],
  mapRef: {} as MapContextType['mapRef'],
  itineraryResult: { travelMode: 'DRIVING' },
  addPlace: () => { },
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
  onItineraryReady: () => { },
  toggleTargetItinerary: () => { },
  toggleTravelMode: () => { },
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
        open: itinerary.open !== undefined ? itinerary.open : true,
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
      itinerary: undefined,
    }));
  }, []);


  const closeItinerary = useCallback(async () => {
    const camera = await mapRef.current?.getCamera();
    mapRef.current?.animateCamera({ ...camera, zoom: INITIAL_CAMERA.zoom });
    setState(state => ({
      ...state,
      itinerary: undefined,
      showTargetItinerary: false,
    }));
  }, []);


  const addPlace = useCallback((place: PlaceDoc, location: Coordinate) => {
    if (geocoding.calculateDistanceKm(location, place.coordinate) <= state.radius) {
      near.setPlaces((places) => [...places, place]);
    }
  }, [state.radius]);



  const onItineraryReady = useCallback((itineraryResult: MapDirectionsResponse) => {
    setState(state => ({
      ...state,
      itineraryResult:{
        ...(state.itineraryResult || {} as ItineraryResult),
        result: itineraryResult,
      },
    }));
  }, []);


  const toggleTargetItinerary = useCallback(() => {
    setState(state => ({
      ...state,
      showTargetItinerary: !state.showTargetItinerary,
    }));
  }, []);


  const toggleTravelMode = useCallback(() => {
    setState(state => ({
      ...state,
      itineraryResult: {
        ...(state.itineraryResult || {} as ItineraryResult),
        travelMode: state.itineraryResult?.travelMode === 'DRIVING' ? 'WALKING' : 'DRIVING',
      },
    }));
  }, []);





  useMapParamsEffect((params) => {
    if (params.itinerary) {
      requestItinerary(params.itinerary);
    }
  });



  return (
    <MapContext.Provider
      value={{
        mapRef,
        loading: state.loading,
        newPlace: state.newPlace,
        openModal: state.openModal,
        radius: state.radius,
        places: near.places,
        addPlace,
        itinerary: state.itinerary,
        loadingPlaces: near.loading,
        currentCamera: state.currentCamera,
        itineraryResult: state.itineraryResult,
        showTargetItinerary: state.showTargetItinerary,
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
        onItineraryReady,
        toggleTargetItinerary,
        toggleTravelMode,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}