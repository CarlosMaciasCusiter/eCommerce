import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCS0uXMnwlcrQNrV8rhE49PVDuzbAlKRSE",
    authDomain: "crwn-db-627e5.firebaseapp.com",
    databaseURL: "https://crwn-db-627e5.firebaseio.com",
    projectId: "crwn-db-627e5",
    storageBucket: "crwn-db-627e5.appspot.com",
    messagingSenderId: "227628600122",
    appId: "1:227628600122:web:a329d0457efb43cc0b9e03",
    measurementId: "G-XENNEPVH5P"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
