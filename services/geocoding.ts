import { Coordinate } from "./types";

async function getAddressFromCoords(coords: Coordinate) {
  const { latitude, longitude } = coords;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`;

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


export const geocoding = {
  getAddressFromCoords,
}