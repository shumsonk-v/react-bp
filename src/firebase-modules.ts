import firebase from 'firebase/app';
import 'firebase/auth';
import { FIREBASE_AUTH_METHODS } from './constants';

const auth = firebase.auth();
const authProviders: string[] = (process.env.REACT_APP_AUTH_PROVIDERS || FIREBASE_AUTH_METHODS.GOOGLE).split(',');
const hasFirebaseAuth = authProviders.filter(a => /fbs/gi.test(a)).length > 0;
const authPersistenceMode = {
  LOCAL: firebase.auth.Auth.Persistence.LOCAL,
  SESSION: firebase.auth.Auth.Persistence.SESSION,
  NONE: firebase.auth.Auth.Persistence.NONE,
};

function getAuthenticationProvider(method: string): any {
  switch (method) {
    case FIREBASE_AUTH_METHODS.GOOGLE:
      return firebase.auth.GoogleAuthProvider;
    case FIREBASE_AUTH_METHODS.BASIC:
    default:
      return null;
  }
}

export {
  auth,
  authProviders,
  authPersistenceMode,
  hasFirebaseAuth,
  getAuthenticationProvider
};