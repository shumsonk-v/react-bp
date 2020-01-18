import React, { useState } from 'react';
import { getAuthenticationProvider, authProviders } from './../firebase-modules';
import { Dialog, DialogTitle, DialogContent, Divider, Link as MuiLink, Button } from '@material-ui/core';
import { CustomBox } from './helpers/CustomBox';
import LoginForm from './forms/LoginForm';
import ForgotPasswordForm from './forms/ForgotPasswordForm';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { APP_LOGIN_REQUESTED } from 'src/sagas/AppSagas';
import { IAppState } from './../interfaces';
import { useEffect } from 'react';
import { APP_SET_BUSY } from 'src/stores/AppActions';
import { FIREBASE_AUTH_METHODS } from '../constants';

const authProvidersIcon: any = {
  FBS_GOOGLE: faGoogle
};

const closeLoginDialog = (cb: any) => {
  if (typeof cb === 'function') {
    cb();
  }
};

const LoginDialog = (props: any) => {
  const { open, onLoginClose, loginWithProvider, isAuthenticated, setAppBusy, isAppBusy, notification } = props;
  const { t } = useTranslation();
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const configuredProviders: string[] = (process.env.REACT_APP_AUTH_PROVIDERS || FIREBASE_AUTH_METHODS.GOOGLE).split(',');
  const [formBusy, setFormBusy] = useState(false);

  const handleLoginClose = () => {
    if (!isAppBusy && !formBusy) {
      onLoginClose();
    }
  };
  
  const handleProcessingCustomForm = () => {
    setAppBusy(true);
    setFormBusy(true);
  };

  const customSignInRenderer = () => {
    const hasFirebaseBasicAuth = authProviders.filter(a => /fbs_basic/gi.test(a)).length > 0;

    return (
      <>
        {!forgotPasswordMode || hasFirebaseBasicAuth ? <LoginForm onProcessingForm={handleProcessingCustomForm} /> : <ForgotPasswordForm />}
        {hasFirebaseBasicAuth ? <CustomBox mb={2} /> :
          <>
            <CustomBox my={2}>
              <Divider />
            </CustomBox>
            <CustomBox mb={2}>
            {!forgotPasswordMode ?
              <MuiLink href="#" onClick={(e: any) => changeMode(e, true)}>{t('component.login.lnkForgotPass')}</MuiLink> :
              <MuiLink href="#" onClick={(e: any) => changeMode(e, false)}>{t('component.login.lnkBackToLogin')}</MuiLink>
            }
            </CustomBox>
          </>
        }
      </>
    );
  };

  const renderContent = () => {
    const content: any[] = [];

    configuredProviders.forEach((p) => {
      switch (p) {
        case FIREBASE_AUTH_METHODS.GOOGLE:
          content.push(
            <CustomBox mb={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FontAwesomeIcon icon={authProvidersIcon[p]} />}
                onClick={() => providerSignInHandler(p)}
                disabled={isAppBusy}
              >
                {t(`component.login.providers.${p}`)}
              </Button>
            </CustomBox>
          );
          break;
        case FIREBASE_AUTH_METHODS.BASIC:
        default:
          content.push(<>{customSignInRenderer()}</>);
          break;
      }
    });

    return content.map((comp, i) => 
      <CustomBox key={i}>
        {comp}
        {i === content.length - 1 ? null :
          <CustomBox my={2}>
            <Divider />
          </CustomBox>
        }
      </CustomBox>
    );
  }

  const changeMode = (e: any, value: boolean) => {
    e.preventDefault();
    setForgotPasswordMode(value);
  };

  const handleLoginEnter = () => {
    setForgotPasswordMode(false);
  };

  const providerSignInHandler = (method: string) => {
    const providerModule = getAuthenticationProvider(method);

    if (providerModule) {
      const provider = new providerModule();
      setAppBusy(true);
      loginWithProvider(method, provider);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      closeLoginDialog(onLoginClose);
    }
    if (notification) {
      setFormBusy(false);
    }
  }, [isAuthenticated, onLoginClose, notification]);

  return (
    <>
      <Dialog open={open} onClose={handleLoginClose} onEnter={handleLoginEnter} maxWidth="xs">
        <DialogTitle>
          {!forgotPasswordMode ? t('component.login.ttlLogin') : t('component.login.ttlForgotPass')}
        </DialogTitle>
        <DialogContent>
          {renderContent()}
        </DialogContent>
      </Dialog>
    </>
  )
};

const state2props = (state: IAppState) => ({
  isAuthenticated: state.isAuthenticated,
  isAppBusy: state.isAppBusy,
  notification: state.notification
});

const dispatch2props = (dispatch: any) => ({
  loginWithProvider: (method: string, provider: any) => {
    dispatch({
      type: APP_LOGIN_REQUESTED,
      payload: {
        method,
        provider,
      },
    });
  },
  setAppBusy: (isAppBusy: boolean) => {
    dispatch({
      type: APP_SET_BUSY,
      payload: {
        isAppBusy
      }
    })
  }
});

export default connect(state2props, dispatch2props)(LoginDialog);