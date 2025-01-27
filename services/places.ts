import { File, PlaceDoc } from './types';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';




async function uploadFile(File: File) {
  const { uri, name } = File;
  const time = new Date().getTime();
  const reference = storage().ref(`places/${time}-${name}`);

  const response = await reference.putFile(uri, {
    customMetadata: {
      name,
    }
  });
  return response;
}



async function createPlace(place: PlaceDoc) {
  const result = await firestore()
    .collection('places')
    .add({
      ...place,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
  return result.id;
}



async function getPlaces(): Promise<PlaceDoc[]> {
  const places: PlaceDoc[] = [];

  const query = await firestore().collection('places').get();
  query.forEach((doc) => {
    places.push({
      id: doc.id,
      ...doc.data() as PlaceDoc,
    });
  });
  return places;
}






export const places = {
  uploadFile,
  getPlaces,
  createPlace,
};