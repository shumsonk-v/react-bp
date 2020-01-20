import { ILanguage } from './interfaces';

export enum USER_ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export const DEFAULT_LANGUAGES: ILanguage = { lang: 'en', text: 'English' };
export const LANGUAGES: ILanguage[] = [
  { lang: 'en', text: 'English' },
  { lang: 'th', text: 'ภาษาไทย' }
];

export const FIREBASE_AUTH_METHODS = {
  BASIC: 'FBS_BASIC',
  GOOGLE: 'FBS_GOOGLE'
};
