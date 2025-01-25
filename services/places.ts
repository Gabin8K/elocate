import { File, PlaceDoc } from './types';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';




async function uploadFile(File: File) {
  const { uri, name } = File;
  const time = new Date().getTime();
  const reference = storage().ref(`place/${time}-${name}`);

  const response = await reference.putFile(uri, {
    customMetadata: {
      name,
    }
  });
  return response;
}



async function createPlace(place: PlaceDoc) {
  const result = await firestore()
    .collection('place')
    .add({
      ...place,
      createdAt: firestore.FieldValue.serverTimestamp(),
    })
  return result.id;
}




export const places = {
  uploadFile,
  createPlace,
};