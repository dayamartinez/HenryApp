import firebase from 'firebase/app'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGaFE-p60D8OVG6bjoAeuN6Ur3EnyQCu8",
    authDomain: "henryappteamone.firebaseapp.com",
    databaseURL: "https://henryappteamone.firebaseio.com",
    projectId: "henryappteamone",
    storageBucket: "henryappteamone.appspot.com",
    messagingSenderId: "1026979284059",
    appId: "1:1026979284059:web:08f183eb11ecb69749eb7e",
    measurementId: "G-3Q8RBBPGMN"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export  {storage, firebase as default};