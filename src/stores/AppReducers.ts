import { IReduxAction } from 'src/interfaces/interfaces';
import { IAuthUser, IAuthState } from '../interfaces/interfaces';
import { IAppState } from './../interfaces';

import {
  APP_LOGIN_COMPLETED, APP_LOGOUT_COMPLETED, APP_SET_PAGE_TITLE,
  APP_UPDATE_AUTH, APP_UPDATE_INIT, APP_SET_BUSY, APP_SET_NOTIFICATION,
  APP_SET_LANGUAGE,
  APP_SET_DOC_TITLE,
} from './AppActions';
import { LANGUAGES } from 'src/constants';

const lang = window.localStorage.getItem('_rbp_lng_') || LANGUAGES[0].lang || 'en';

const initialState: IAppState = {
  isAuthenticated: false,
  pageTitle: '',
  docTitle: '',
  initAuthCheck: false,
  isAppBusy: false,
  auth: null,
  currentLanguage: lang,
};

function appReducers(state: IAppState = initialState, action: IReduxAction) {
  switch (action.type) {
    case APP_SET_PAGE_TITLE:
      return Object.assign({}, state, {
        pageTitle: action.payload.pageTitle
      });
    case APP_SET_DOC_TITLE:
      return Object.assign({}, state, {
        docTitle: action.payload.docTitle
      });
    case APP_LOGIN_COMPLETED:
    case APP_UPDATE_AUTH:
      const authInfo = action.payload.authInfo;
      let auth: IAuthState | null = null;
      let authUser: IAuthUser | null = null;

      if (authInfo) {
        const { user, token, method } = authInfo;
        authUser = {
          id: user.id,
          username: user.username,
          role: user.role,
          displayName: user.displayName || '',
          profileImage: user.profileImage || '',
        };

        auth = {
          token,
          method,
          user: authUser,
        };
      }

      return Object.assign({}, state, {
        auth,
        isAuthenticated: auth !== null,
      });
    case APP_UPDATE_INIT:
      return Object.assign({}, state, {
        initAuthCheck: true,
      });
    case APP_LOGOUT_COMPLETED:
      return Object.assign({}, state, {
        isAuthenticated: false,
        auth: null,
        isAppBusy: false,
      });
    case APP_SET_BUSY:
      return Object.assign({}, state, {
        isAppBusy: action.payload.isAppBusy
      });
    case APP_SET_NOTIFICATION:
      const notification = action.payload.notification;
      return Object.assign({}, state, {
        notification: notification || null,
      });
    case APP_SET_LANGUAGE:
      return Object.assign({}, state, {
        currentLanguage: action.payload.lang || LANGUAGES[0].lang,
      });
    default:
      return state;
  }
}

export default appReducers;