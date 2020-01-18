import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomBox } from './helpers/CustomBox';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <CustomBox mb={3}>
        <Typography variant="body1">{t('component.about.descP1')}</Typography>
      </CustomBox>
      <CustomBox mb={3}>
        <Typography variant="body1">{t('component.about.descP2')}</Typography>
      </CustomBox>
    </>
  )
};

export default About;
