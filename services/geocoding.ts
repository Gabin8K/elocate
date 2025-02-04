import { Coordinate, PlaceDoc } from "./types";
import storage from '@react-native-firebase/storage';
import firestore, { getDocs, query, where } from "@react-native-firebase/firestore";


const R = 6371;


async function getAddressFromCoords(coords: Coordinate, language: string) {
  const { latitude, longitude } = coords;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=${language}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data);
  }

  return data.results.map((result: any) => {
    return {
      label: result.formatted_address,
      value: result.formatted_address,
    }
  })

}






function calculateDistance(pos1: Coordinate, pos2: Coordinate) {
  const dLat = degreesToRadians(pos2.latitude - pos1.latitude);
  const dLon = degreesToRadians(pos2.longitude - pos1.longitude);
  const lat1 = degreesToRadians(pos1.latitude);
  const lat2 = degreesToRadians(pos2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}


function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}


function getBoundingBox(coordinate: Coordinate, radius: number) {
  const lat = coordinate.latitude;
  const lon = coordinate.longitude;

  const deltaLat = (radius / R) * (180 / Math.PI);
  const deltaLon = (radius / R) * (180 / Math.PI) / Math.cos(lat * (Math.PI / 180));

  return {
    minLat: lat - deltaLat,
    maxLat: lat + deltaLat,
    minLon: lon - deltaLon,
    maxLon: lon + deltaLon,
  };
}



async function getCoordsWithinRadiusDirectly(location: Coordinate, radius: number) {
  const boundingBox = getBoundingBox(location, radius);
  const placesQuery = query(
    firestore().collection('places'),
    where('coordinate.latitude', '>=', boundingBox.minLat),
    where('coordinate.latitude', '<=', boundingBox.maxLat),
    where('coordinate.longitude', '>=', boundingBox.minLon),
    where('coordinate.longitude', '<=', boundingBox.maxLon),
  );

  const snapshot = await getDocs(placesQuery);
  const places = snapshot.docs.map<PlaceDoc>((doc) => ({ id: doc.id, ...doc.data() }) as PlaceDoc);


  return places.filter((place) =>
    calculateDistance(location, place.coordinate) <= radius
  );
}






async function getPlacesWithinRadiusDirectly(location: Coordinate, radius: number) {
  const places = await getCoordsWithinRadiusDirectly(location, radius);

  const placesMapped = places.map(async (place) => {
    if (!place.imageRef) return place;
    const imageRef = await storage().ref(place.imageRef).getDownloadURL();
    return {
      ...place,
      imageRef,
    }
  });

  return await Promise.all(placesMapped);
}





async function checkIfPlaceExists(location: Coordinate) {
  const radiusKm = .8;

  const places = await getCoordsWithinRadiusDirectly(location, radiusKm);
  return places.length > 0;

}



export const geocoding = {
  getAddressFromCoords,
  checkIfPlaceExists,
  calculateDistance,
  getCoordsWithinRadiusDirectly,
  getPlacesWithinRadiusDirectly,
}