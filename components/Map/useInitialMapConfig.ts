import { useState } from "react";
import { Coordinate } from "@/services/types";
import { Camera, Region } from "react-native-maps";


export const INITIAL_CAMERA: Camera = {
  center: {
    latitude: 0,
    longitude: 0,
  },
  heading: 30,
  pitch: 60,
  zoom: 17,
}



export function useInitialCamera(location?: Coordinate) {
  const [camera, setCamera] = useState<Camera>(INITIAL_CAMERA);

  if ((camera.center.latitude === 0 || camera.center.longitude === 0) && location) {
    setCamera({
      ...camera,
      center: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    })
  }

  return camera;
}




export function useInitialRegion(location?: Coordinate) {
  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  if ((region.latitude === 0 || region.longitude === 0) && location) {
    setRegion({
      ...region,
      latitude: location.latitude,
      longitude: location.longitude,
    })
  }

  return region;
}