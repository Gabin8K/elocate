import { ExpoConfig, ConfigContext } from 'expo/config';
import { env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name || 'Elocate',
  slug: config.slug || 'elocate',
  android: {
    ...(config.android || {}),
    config: {
      ...(config.android?.config || {}),
      googleMaps: {
        apiKey:env.GOOGLE_MAP_API_KEY
      }
    }
  },
  ios: {
    ...(config.ios || {}),
    config: {
      ...(config.ios?.config || {}),
      googleMapsApiKey:env.GOOGLE_MAP_API_KEY
    }
  },
  extra: {
    ...(config.extra || {}),
    env: {
      ...(config.extra?.env || {}),
      apiKey:env.GOOGLE_MAP_API_KEY
    }
  }
});
