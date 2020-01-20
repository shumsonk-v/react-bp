import { IAuthState, IAuthUser } from './../interfaces';
import { auth, authPersistenceMode } from 'src/firebase-modules';
import firebase from 'firebase/app';
import { FIREBASE_AUTH_METHODS, USER_ROLES } from '../constants';

export interface IUserCredentials {
  username: string;
  password: string;
}

const authStorageName = '_rbptk_';
const funcEndpoint = process.env.REACT_APP_FIREBASE_FUNC_ENDPOINT;

// const setAuthToken = (token: any) => {
//   if (token) {
//     localStorage.setItem(authStorageName, token);
//   } else {
//     localStorage.removeItem(authStorageName);
//   }
// }

const AuthenticationService = {
  loginWithProvider: async (payload: any): Promise<IAuthState | null> => {
    let signInReq;
    const { method, provider, cred } = payload;
    const persistenceMode = process.env.REACT_APP_FIREBASE_AUTH_PERSISTENCE || 'LOCAL';
    if (provider || method === FIREBASE_AUTH_METHODS.BASIC) {
      signInReq = new Promise<IAuthState | null>((resolve, reject) => {
        if (provider && method !== FIREBASE_AUTH_METHODS.BASIC) {
          provider.addScope('profile');
          provider.addScope('email');
        }

        auth.setPersistence(authPersistenceMode[persistenceMode]).then(() => {
          return method === FIREBASE_AUTH_METHODS.BASIC ?
            auth.signInWithEmailAndPassword(cred.username, cred.password) :
            auth.signInWithPopup(provider);
        }).then(async (result: firebase.auth.UserCredential) => {
          if (!result || !result.user) {
            resolve(null);
            return;
          }

          let userInfo: IAuthUser | null = null;
          const tokenRes = await result.user?.getIdTokenResult();
          const { user } = result;

          let role = null;
          const roleContained = tokenRes && tokenRes.claims ?
            tokenRes.claims.hasOwnProperty('admin') || tokenRes.claims.hasOwnProperty('user') :
            false;
          if (!roleContained && method === FIREBASE_AUTH_METHODS.BASIC && funcEndpoint) {
            const claimsResp = await fetch(`${funcEndpoint}/claims`, {
              method: 'GET',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json',
                'uid': user.uid,
              },
              referrerPolicy: 'no-referrer',
            });
            const claimsObj = await claimsResp.json();
            role = claimsObj.admin ? USER_ROLES.ADMIN : USER_ROLES.USER;
          }
          if (roleContained) {
            role = tokenRes.claims.admin ? USER_ROLES.ADMIN : USER_ROLES.USER;
          }

          userInfo = {
            id: user.uid,
            username: user.email,
            displayName: user.displayName,
            role,
            profileImage: user.photoURL,
          };

          resolve({
            token: tokenRes ? tokenRes.token : null,
            method,
            user: userInfo
          });
        }).catch((e) => {
          reject(e);
        });
      });
    } else {
      signInReq = new Promise<IAuthState | null>((resolve) => { resolve(null) });
    }

    return await signInReq;
  },
  logoutFromProvider: async (): Promise<boolean> => {
    const logoutReq = new Promise<boolean>((resolve, reject) => {
      auth.signOut().then(() => {
        AuthenticationService.setAuthToken(null);
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });

    return await logoutReq;
  },
  checkAuth: async (): Promise<boolean> => {
    const checkAuthReq = new Promise<boolean>((resolve) => {
      const token = window.localStorage.getItem(authStorageName);
      resolve(typeof token === 'string');
    });
    return await checkAuthReq;
  },
  getPersonalProfile: async (): Promise<any> => {
    const token = localStorage.getItem(authStorageName);
    let reqHeaders = {
      'Content-Type': 'application/json'
    };
    if (token) {
      reqHeaders['Authorization'] = `Bearer ${token}`;
    }

    const profileResp = await fetch(`${funcEndpoint}/author-profile`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: reqHeaders,
      referrerPolicy: 'no-referrer',
    });
    const profile = await profileResp.json();
    return profile || null;
  },
  setAuthToken: (token: any) => {
    if (token) {
      localStorage.setItem(authStorageName, token);
    } else {
      localStorage.removeItem(authStorageName);
    }
  }
};

export default AuthenticationService;