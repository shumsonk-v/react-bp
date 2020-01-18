import { IAuthState, IAuthUser } from './../interfaces';
import { auth, authPersistenceMode } from 'src/firebase-modules';
import firebase from 'firebase/app';
import { FIREBASE_AUTH_METHODS } from '../constants';

export interface IUserCredentials {
  username: string;
  password: string;
}

const authStorageName = '_rbptk_';

const AuthenticationService = {
  login: async (cred: IUserCredentials): Promise<IAuthState | null> => {
    const loginReq = new Promise<IAuthState | null>((resolve, reject) => {
      setTimeout(() => {
        const userInfo: IAuthUser | null = cred.username === 'admin' && cred.password === 'password' ?
          { id: 1, username: 'admin', role: 'ADMIN' } : null;

        if (!userInfo) {
          window.localStorage.removeItem(authStorageName);
          resolve(null);
          return;
        }

        const mockToken = 'q1w2e3r4r5';
        window.localStorage.setItem(authStorageName, mockToken);  
        resolve({
          token: mockToken,
          method: 'normal',
          user: userInfo
        });
      }, 1500);
    });

    return await loginReq;
  },
  logout: async (): Promise<boolean> => {
    const logoutReq = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        window.localStorage.removeItem(authStorageName);
        resolve(true);
      }, 1000);
    });
    return await logoutReq;
  },
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
          const claimsEndpoint = process.env.REACT_APP_FIREBASE_CLAIMS_ENDPOINT;
          if (method === FIREBASE_AUTH_METHODS.BASIC && claimsEndpoint) {
            const claimsResp = await fetch(`${claimsEndpoint}/claims`, {
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
            role = claimsObj.admin ? 'ADMIN' : 'USER';
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
};

export default AuthenticationService;