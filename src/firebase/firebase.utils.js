import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB1-t-qx3oFP1GrhAji22OxV5AoPSyx_BQ",
  authDomain: "crwn-db-b2443.firebaseapp.com",
  projectId: "crwn-db-b2443",
  storageBucket: "crwn-db-b2443.appspot.com",
  messagingSenderId: "611059974899",
  appId: "1:611059974899:web:4c40aad2ec2284e5fbed86",
  measurementId: "G-PLP29GKT98",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("Error creating user...", err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
