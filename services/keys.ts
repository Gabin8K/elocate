import Constants from 'expo-constants';

export const API_KEY = Constants.expoConfig?.android?.config?.googleMaps?.apiKey
  || Constants.expoConfig?.ios?.config?.googleMapsApiKey
  || process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY
  || '';