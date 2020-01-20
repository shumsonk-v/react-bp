import { Backdrop, CircularProgress, CssBaseline, Snackbar } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { User } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from './components/helpers/Alert';
import RouteWithSubRoutes from './components/helpers/RouteWithSubRoutes';
import ScrollToTop from './components/helpers/ScrollToTop';
import MainAppBar from './components/MainAppBar';
import MainNav from './components/MainNav';
import NotFound from './components/NotFound';
import { FIREBASE_AUTH_METHODS, USER_ROLES } from './constants';
import { auth, hasFirebaseAuth } from './firebase-modules';
import { IAppState, IAuthState } from './interfaces';
import routes from './routes';
import { APP_UPDATE_AUTH_REQUESTED, APP_GET_PROFILE_REQUESTED } from './sagas/AppSagas';
import { APP_SET_NOTIFICATION, APP_UPDATE_INIT } from './stores/AppActions';
import { customTheme, GlobalStyle, useMainStyles } from './styles';
import { useTranslation } from 'react-i18next';

interface IAppCompProps extends IAppState {
  updateAuthStatus: (u: any, token?: firebase.auth.IdTokenResult, provider?: string) => void;
  updateInitAuthCheck: () => void;
  getProfile: () => void;
}

function App(props: IAppCompProps) {
  const classes = useMainStyles();
  const { t, i18n } = useTranslation();
  const { updateAuthStatus, updateInitAuthCheck, initAuthCheck, isAppBusy, notification, getProfile } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appInit, setAppInit] = useState(false);
  const [appSnackbarOpen, setAppSnackbarOpen] = useState(false);

  useEffect(() => {
    if (!appInit) {
      if (hasFirebaseAuth) {
        auth.onAuthStateChanged((u) => {
          setAppInit(true);

          if (!u) {
            updateAuthStatus(null);
            updateInitAuthCheck();
            getProfile();
          } else {
            u.getIdTokenResult().then((tokenRes) => {
              updateAuthStatus(u, tokenRes, FIREBASE_AUTH_METHODS.GOOGLE);
              updateInitAuthCheck();
              getProfile();
            });
          }
        });
      } else {
        setAppInit(true);
      }
    }

    if (notification) {
      setAppSnackbarOpen(true);
    }
  }, [appInit, notification]);

  const snackbarCloseHandler = (cb?: Function) => {
    if (typeof cb === 'function') {
      cb();
    }
    setAppSnackbarOpen(false);
  };

  const renderSnackbar = () => {
    if (!notification) {
      return null;
    }

    const { type, message, onClick } = notification;
    return (
      <Snackbar open={appSnackbarOpen} autoHideDuration={6000} onClose={() => snackbarCloseHandler(onClick)}>
        <Alert severity={type}>{t(message)}</Alert>
      </Snackbar>
    );
  };

  const renderApp = () => {
    return (
      <>
        <MainAppBar {...props} onOpenDrawer={() => setDrawerOpen(true)} />
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        
        <MainNav open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </>
    );
  }

  return (
    <MuiThemeProvider theme={customTheme}>
      <Router>
        <CssBaseline />
        <GlobalStyle />
        <ScrollToTop />
        <Helmet htmlAttributes={{ lang: i18n.language }}>
          <title>{`${process.env.REACT_APP_NAME || 'App'} - ${props.docTitle}`}</title>
        </Helmet>
        {initAuthCheck ? renderApp() : null}
        <Backdrop className={classes.backdrop} open={typeof isAppBusy === 'boolean' && isAppBusy}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {renderSnackbar()}
      </Router>
    </MuiThemeProvider>
  );
}

const state2props = (state: IAppState) => ({
  isAuthenticated: state.isAuthenticated,
  pageTitle: state.pageTitle || 'Untitled',
  docTitle: state.docTitle || 'Untitled',
  initAuthCheck: state.initAuthCheck,
  isAppBusy: state.isAppBusy || false,
  notification: state.notification
});

const dispatch2props = (dispatch: any) => ({
  updateAuthStatus: (u: User | null, tokenRes?: firebase.auth.IdTokenResult, method?: string | null) => {
    let authInfo: IAuthState | null = null;
    if (!tokenRes) {
      dispatch({
        type: APP_UPDATE_AUTH_REQUESTED,
        payload: {
          authInfo: null
        }
      });
      return;
    }

    const { claims, token } = tokenRes;
    if (u && tokenRes && method) {
      const role = claims.admin ? USER_ROLES.ADMIN : USER_ROLES.USER;

      authInfo = {
        token,
        method,
        user: {
          id: u.uid,
          username: u.email,
          displayName: u.displayName,
          role,
          profileImage: u.photoURL,
        }
      };
    }

    dispatch({
      type: APP_UPDATE_AUTH_REQUESTED,
      payload: {
        authInfo,
      }
    })
  },
  updateInitAuthCheck: () => {
    dispatch({
      type: APP_UPDATE_INIT
    });
  },
  closeNotification: () => {
    dispatch({
      type: APP_SET_NOTIFICATION,
    });
  },
  getProfile: () => {
    dispatch({
      type: APP_GET_PROFILE_REQUESTED,
    });
  }
});

export default connect(state2props, dispatch2props)(App);
