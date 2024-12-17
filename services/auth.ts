import firebaseAuth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import googleService from '@/google-services.json';

const webClientId = googleService.client[0].oauth_client[1].client_id;
const iosClientId = googleService.client[0].services.appinvite_service.other_platform_oauth_client[1].client_id;

GoogleSignin.configure({
  webClientId,
  iosClientId
});


async function onGoogleSignin() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const signInResult = await GoogleSignin.signIn();

  let idToken = signInResult.data?.idToken;
  if (!idToken) {
    // @ts-ignore
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  const googleCredential = firebaseAuth.GoogleAuthProvider.credential(idToken);
  await firebaseAuth().signInWithCredential(googleCredential);
}


async function onGoogleSignout() {
  await GoogleSignin.signOut();
  await firebaseAuth().signOut();
}


export const auth = {
  onGoogleSignin,
  onGoogleSignout
}