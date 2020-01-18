import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from 'src/constants';


const lang = window.localStorage.getItem('_rbp_lng_') || LANGUAGES[0].lang || 'en';

i18n.use(initReactI18next).use(XHR)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    lng: lang,
    keySeparator: '.', // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;

