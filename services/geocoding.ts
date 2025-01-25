import { Coordinate, PlaceDoc } from "./types";
import firestore, { getDocs, query, where }  from "@react-native-firebase/firestore";


const EARTH_RADIUS_KM = 6371;


async function getAddressFromCoords(coords: Coordinate, language: string ) {
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






function calculateBoundingBox(coordinate: Coordinate, radiusInKm: number) {
  const { latitude, longitude } = coordinate;
  const latDelta = radiusInKm / EARTH_RADIUS_KM;
  const lonDelta = radiusInKm / (EARTH_RADIUS_KM * Math.cos((latitude * Math.PI) / 180));

  return {
    minLat: latitude - latDelta,
    maxLat: latitude + latDelta,
    minLon: longitude - lonDelta,
    maxLon: longitude + lonDelta,
  }
}

// Fonction principale pour récupérer les lieux
async function getCoordsWithinRadiusDirectly(currentLocation: Coordinate, radiusInKm: number): Promise<PlaceDoc[]> {
  // Étape 1 : Calcul de la bounding box
  const { maxLat, maxLon } = calculateBoundingBox(
    currentLocation,
    radiusInKm
  );

  // Étape 2 : Requête Firestore pour récupérer les lieux dans la bounding box
  const coordinatesCollection = firestore().collection('place');
  const locationsQuery = query(
    coordinatesCollection,
    where("coordinate.latitude", "<=", maxLat),
    where("coordinate.longitude", "<=", maxLon)
  );
  
  const snapshot = await getDocs(locationsQuery);
  console.log(snapshot.docs.length)
  // Étape 3 : Appliquer le filtre de distance exacte (haversine)

  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c;
  }

  const places = snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((data: any) => {
      const distance = haversineDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        data.coordinate.latitude,
        data.coordinate.longitude
      );
      return distance <= radiusInKm;
    });

  return places as PlaceDoc[];
}




export const geocoding = {
  getAddressFromCoords,
  getCoordsWithinRadiusDirectly,
}