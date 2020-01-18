import React from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button, DialogContentText } from '@material-ui/core';
import { CustomBox } from '../helpers/CustomBox';
import { useTranslation } from 'react-i18next';

const ForgotPasswordForm = () => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const { t } = useTranslation();

  const onSubmit = (fData: any) => {
    console.log(fData);
  };

  return (
    <>
      <DialogContentText>
        {t('component.login.descForgotPass')}
      </DialogContentText>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={0} justify="flex-end">
          <Grid item xs={12}>
            <TextField
              required
              label="E-mail"
              fullWidth
              name="email"
              inputRef={register({ required: true })}
              onChange={(e) => setValue('email', e.target.value)}
              error={errors.email !== undefined} />
          </Grid>
          <Grid item xs={5}>
            <CustomBox mt={3}>
              <Button type="submit" color="primary" variant="contained" fullWidth>{t('component.login.btnResetPass')}</Button>
            </CustomBox>
          </Grid>
        </Grid>
      </form>
    </>
  )
};

export default ForgotPasswordForm;