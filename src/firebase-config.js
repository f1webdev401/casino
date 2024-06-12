import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'
const firebaseConfig = {
    apiKey: "AIzaSyAlO-bcol19T-rmqpK1ukXZy4O5sMo-AjQ",
    authDomain: "casino-208b6.firebaseapp.com",
    databaseURL: "https://casino-208b6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "casino-208b6",
    storageBucket: "casino-208b6.appspot.com",
    messagingSenderId: "497063955187",
    appId: "1:497063955187:web:52690fdecda10eb3c30586",
    measurementId: "G-WJ72GX9Q7K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db =  getDatabase(app)