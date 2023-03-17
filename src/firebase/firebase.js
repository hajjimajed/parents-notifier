// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    getUser,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBx1ZLLGHflBM7Aha9j8jij6AxTvlFuj9c",
    authDomain: "parents-notifier.firebaseapp.com",
    projectId: "parents-notifier",
    storageBucket: "parents-notifier.appspot.com",
    messagingSenderId: "884367414285",
    appId: "1:884367414285:web:08197026608e1dca973144"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();


export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

}

export const createTeacherDocumentFromAuth = async (userAuth, additionalinformations) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'teachers', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { username, email } = userAuth;
        const createdAt = new Date();


        try {
            await setDoc(userDocRef, {
                username,
                email,
                createdAt,
                ref: 'teacher',
                ...additionalinformations
            })
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }
    return userDocRef;
}

export const createStudentDocumentFromAuth = async (userAuth, additionalinformations) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'students', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { username, email } = userAuth;
        const createdAt = new Date();


        try {
            await setDoc(userDocRef, {
                username,
                email,
                createdAt,
                ref: 'student',
                ...additionalinformations
            })
        } catch (error) {
            console.log('Error creating the user', error.message);
        }
    }
    return userDocRef;
}


export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const currentTeacherData = async (currentTeacher) => {
    if (currentTeacher) {

        const docRef = doc(db, "teachers", currentTeacher.uid);
        const docSnap = await getDoc(docRef);
        const datas = docSnap.data()
        return datas;

    }
}