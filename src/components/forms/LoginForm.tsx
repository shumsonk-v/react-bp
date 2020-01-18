import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button } from '@material-ui/core';
import { CustomBox } from '../helpers/CustomBox';
import { useTranslation } from 'react-i18next';
import { authProviders } from 'src/firebase-modules';
import { connect } from 'react-redux';
import { APP_LOGIN_REQUESTED } from 'src/sagas/AppSagas';
import { IAppState } from 'src/interfaces';
import { IUserCredentials } from 'src/services/Authentication';
import { FIREBASE_AUTH_METHODS } from '../../constants';

const LoginForm = (props: any) => {
  const { onProcessingForm, loginWithProvider, notification } = props;
  const { register, handleSubmit, setValue, errors } = useForm();
  const { t } = useTranslation();
  const [formBusy, setFormBusy] = useState(false);

  const onSubmit = (fData: any) => {
    const hasFirebaseBasicAuth = authProviders.filter(a => /fbs_basic/gi.test(a)).length > 0;
    if (hasFirebaseBasicAuth) {
      setFormBusy(true);
      loginWithProvider({
        username: fData.username,
        password: fData.password,
      });
      
      if (typeof onProcessingForm === 'function') {
        onProcessingForm();
      }
    }
  };

  useEffect(() => {
    if (notification) {
      setFormBusy(false);
    }
  }, [notification]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={0} justify="flex-end">
        <Grid item xs={12}>
          <CustomBox>
            <TextField
              required
              label={t('component.login.lblUsername')}
              fullWidth
              name="username"
              inputRef={register({ required: true })}
              onChange={(e) => setValue('username', e.target.value)}
              error={errors.username !== undefined}
              disabled={formBusy} />
          </CustomBox>
        </Grid>
        <Grid item xs={12}>
          <CustomBox mt={1}>
            <TextField
              required
              type="password"
              label={t('component.login.lblPassword')}
              fullWidth
              name="password"
              inputRef={register({ required: true })}
              onChange={(e) => setValue('password', e.target.value)}
              error={errors.password !== undefined}
              disabled={formBusy} />
          </CustomBox>
        </Grid>
        <Grid item xs={5}>
          <CustomBox mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth disabled={formBusy}>{t('component.login.btnLogin')}</Button>
          </CustomBox>
        </Grid>
      </Grid>
    </form>
  );
}

const state2props = (state: IAppState) => ({
  isAuthenticated: state.isAuthenticated,
  isAppBusy: state.isAppBusy,
  notification: state.notification,
});

const dispatch2props = (dispatch: any) => ({
  loginWithProvider: (cred: IUserCredentials) => {
    dispatch({
      type: APP_LOGIN_REQUESTED,
      payload: {
        method: FIREBASE_AUTH_METHODS.BASIC,
        cred,
      },
    });
  }
});

export default connect(state2props, dispatch2props)(LoginForm);
