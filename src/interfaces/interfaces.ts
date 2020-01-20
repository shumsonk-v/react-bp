import { Action } from 'redux';

export interface IReduxAction extends Action {
  payload?: any;
}

export interface INotification {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClick?: () => void;
}

export interface ILanguage {
  text: string;
  lang: string;
}

export interface IAuthUser {
  id: string | number;
  username: string | null;
  displayName?: string | null;
  role: string | null;
  profileImage?: string | null;
}

export interface IAuthState {
  token: string | null;
  method: string | null;
  user: IAuthUser | null;
}

export interface IAppState {
  isAuthenticated: boolean;
  pageTitle?: string;
  docTitle?: string;
  initAuthCheck?: boolean;
  isAppBusy?: boolean;
  auth?: IAuthState | null;
  notification?: INotification | null;
  currentLanguage?: string;
  myProfile?: any;
}
