import React from "react"
import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"

firebase.initializeApp({
    apiKey: "AIzaSyA1VhrRWyrknAHMGHXA8WShvjoJZUvLTeM",
    authDomain: "webpass-1faad.firebaseapp.com",
    databaseURL: "https://webpass-1faad.firebaseio.com",
    projectId: "webpass-1faad",
    storageBucket: "webpass-1faad.appspot.com",
    messagingSenderId: "363254375294",
    appId: "1:363254375294:web:6e389a7ca64eb3f251892f"
})


const auth = firebase.auth();
const database = firebase.database();

const firebaseContext = React.createContext()
const CurrentUserContext = React.createContext()
const CurrentPageContext = React.createContext()

export {firebaseContext, CurrentUserContext, CurrentPageContext}
export {auth, database, firebase}