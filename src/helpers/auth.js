import { ref, firebaseAuth } from '../config/constants'
import firebase from 'firebase'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function loginWithFacebook () {
  // Sign in using a popup.
  var provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('DisplayName');
  return firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    this.saveUser(user);
  });
}

export function loginWithGoogle (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}