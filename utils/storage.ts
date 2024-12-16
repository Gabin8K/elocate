import AsyncStorage from '@react-native-async-storage/async-storage';


type StorageKeys =
  | 'auth'
  | 'setting';


export async function AsyncStorageGetItem<T = string>(key: StorageKeys): Promise<T | null> {
  const item = await AsyncStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export async function AsyncStorageSetItem(key: StorageKeys, value: string | object): Promise<void> {
  await AsyncStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value),
  );
}

export async function AsyncStorageRemoveItem(key: StorageKeys): Promise<void> {
  await AsyncStorage.removeItem(key);
}