import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import AuthSvc from '../services/Authentication';
import { APP_UPDATE_AUTH, APP_SET_BUSY, APP_LOGIN_COMPLETED, APP_LOGOUT_COMPLETED, APP_SET_NOTIFICATION } from 'src/stores/AppActions';

export const APP_LOGIN_REQUESTED = 'APP_LOGIN_REQUESTED';
export const APP_LOGOUT_REQUESTED = 'APP_LOGOUT_REQUESTED';
export const APP_UPDATE_AUTH_REQUESTED = 'APP_UPDATE_AUTH_REQUESTED';

function* login({ payload }: AnyAction) {
  try {
    let authInfo = null;
    if (payload.method === 'normal') {
      authInfo = yield call(AuthSvc.login, payload.credentials);
    } else {
      authInfo = yield call(AuthSvc.loginWithProvider, payload);
    }
    yield put({ type: APP_LOGIN_COMPLETED, payload: { authInfo } });
    yield put({ type: APP_SET_BUSY, payload: { isAppBusy: false } });
  } catch (e) {
    yield put({ type: APP_LOGIN_COMPLETED, payload: { authInfo: null } });
    yield put({ type: APP_SET_BUSY, payload: { isAppBusy: false } });
    yield put({ type: APP_SET_NOTIFICATION, payload: { notification: { type: 'error', message: `error.${e.code || 'login'}` } }})
  }
}

function* logout({ payload }: AnyAction) {
  try {
    let authUser = null;
    if (payload.provider === 'normal') {
      authUser = yield call(AuthSvc.logout);
    } else {
      authUser = yield call(AuthSvc.logoutFromProvider);
    }
    yield put({ type: APP_LOGOUT_COMPLETED, userInfo: authUser });
  } catch (e) {
    yield put({ type: APP_LOGOUT_COMPLETED, message: e.message });
  }
}

function* updateUserAuth({ payload }: AnyAction) {
  yield put({ type: APP_UPDATE_AUTH, payload: { authInfo: payload.authInfo } });
}

function* authSaga() {
  yield takeLatest(APP_LOGIN_REQUESTED, login);
  yield takeLatest(APP_LOGOUT_REQUESTED, logout);
  yield takeLatest(APP_UPDATE_AUTH_REQUESTED, updateUserAuth);
}

export default authSaga;