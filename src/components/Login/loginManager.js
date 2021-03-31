import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export const getGoogleProvider = new firebase.auth.GoogleAuthProvider();
export const getGithubProvider = new firebase.auth.GithubAuthProvider();

export const signInWithProviderFirebase = provider => {
    return firebase.auth()
        .signInWithPopup(provider)
        .then(result => result.user).catch(error => error.message);
}

export const createUserWithEmailPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
            updateUser(name);
            return res.user;
        })
        .catch((error) => error.message);
}
const updateUser = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(function () {
        // console.log(name, "updated");
    }).catch(function (error) {
        // console.log(name, 'update failed');
    });

}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => res.user)
        .catch((error) => error.message);
}