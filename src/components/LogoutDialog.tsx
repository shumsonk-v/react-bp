import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const LogoutDialog = (props: any) => {
  const { open, onLogoutOk, onLogoutCancel } = props;
  const { t } = useTranslation();

  const handleOk = () => {
    if (typeof onLogoutOk === 'function') {
      onLogoutOk();
    }
  };

  const handleCancel = () => {
    if (typeof onLogoutCancel === 'function') {
      onLogoutCancel();
    }
  };

  return (
    <>
      <Dialog open={open}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs">
        <DialogTitle>{t('component.logout.ttlLogout')}</DialogTitle>
        <DialogContent>{t('component.logout.descLogout')}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>{t('common.cancel')}</Button>
          <Button color="secondary" onClick={handleOk}>{t('component.logout.btnLogout')}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default LogoutDialog;