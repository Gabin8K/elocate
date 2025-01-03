import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name || 'Elocate CMR',
  slug: config.slug || 'elocate-cmr',
  android: {
    ...(config.android || {}),
    config: {
      ...(config.android?.config || {}),
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY
      }
    }
  },
  ios: {
    ...(config.ios || {}),
    config: {
      ...(config.ios?.config || {}),
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY
    }
  }
});
