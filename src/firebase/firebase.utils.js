import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD-JPsu61Z3a2humDdkjdDuhejrj8FMq3o",
    authDomain: "crwn-db-3a8e0.firebaseapp.com",
    databaseURL: "https://crwn-db-3a8e0.firebaseio.com",
    projectId: "crwn-db-3a8e0",
    storageBucket: "crwn-db-3a8e0.appspot.com",
    messagingSenderId: "407656549",
    appId: "1:407656549:web:22f857cc93be59fca68e8c",
    measurementId: "G-DXZN0GVDFF"
  }

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
      console.log('error creating user');
    }
  }
  return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;