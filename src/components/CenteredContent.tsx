import React from 'react';
import { useMainStyles, useCenteredContentStyles } from 'src/styles';
import { Typography, Divider, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setPageTitle } from 'src/stores/AppActions';
import { CustomBox } from './helpers/CustomBox';

const CenteredContent = (props: any) => {
  const classes = useMainStyles();
  const compClasses = useCenteredContentStyles();
  const { setPageTitle, pageTitle, imgSrc, imgAlt, titleText, descText } = props;
  const { t } = useTranslation();

  if (pageTitle) {
    setPageTitle(t(pageTitle || 'component.notFound.pageTitle'));
  }
  
  return (
    <Box className={`${classes.centerContainer}`}>
      <div className={compClasses.wrapper}>
        <div className={compClasses.imageBlock}>
          <img className={compClasses.image} src={imgSrc || '/assets/icons/error-404.svg'} alt={imgAlt || 'not found'} />
        </div>
        <div className={compClasses.textBlock}>
          <CustomBox mb={1}>
            <Typography variant="h4" classes={{ root: compClasses.textTitle }}>{t(titleText || 'component.notFound.title')}</Typography>
          </CustomBox>
          <Divider />
          <CustomBox mt={1}>
            <Typography variant="body1" classes={{ root: compClasses.textDesc }}>{t(descText || 'component.notFound.description')}</Typography>
          </CustomBox>
        </div>
      </div>
    </Box>
  );
};

const dispatch2props = (dispatch: any) => ({
  setPageTitle: (title: string) => {
    dispatch(setPageTitle(title));
  }
});

export default connect(null, dispatch2props)(CenteredContent);
