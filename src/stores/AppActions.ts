const APP_LOGIN_COMPLETED = 'APP_LOGIN_COMPLETED';
const APP_LOGOUT_COMPLETED = 'APP_LOGOUT_COMPLETED';
const APP_SET_PAGE_TITLE = 'APP_SET_PAGE_TITLE';
const APP_SET_DOC_TITLE = 'APP_SET_DOC_TITLE';
const APP_UPDATE_AUTH = 'APP_UPDATE_AUTH';
const APP_UPDATE_INIT = 'APP_UPDATE_INIT';
const APP_SET_BUSY = 'APP_SET_BUSY';
const APP_SET_NOTIFICATION = 'APP_SET_NOTIFICATION';
const APP_SET_LANGUAGE = 'APP_SET_LANGUAGE';

function setPageTitle(pageTitle: string) {
  return {
    type: APP_SET_PAGE_TITLE,
    payload: {
      pageTitle,
    }
  };
}

function setDocTitle(docTitle: string) {
  return {
    type: APP_SET_DOC_TITLE,
    payload: {
      docTitle,
    }
  };
}

export { APP_LOGIN_COMPLETED, APP_LOGOUT_COMPLETED, APP_SET_PAGE_TITLE,
  APP_UPDATE_AUTH, APP_UPDATE_INIT, APP_SET_BUSY, APP_SET_NOTIFICATION,
  APP_SET_LANGUAGE, APP_SET_DOC_TITLE,
  setPageTitle, setDocTitle };