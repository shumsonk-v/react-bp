import React from 'react';
import CenteredContent from './CenteredContent';
import { useMainStyles } from 'src/styles';
import { Container } from '@material-ui/core';

const NotFound = () => {
  const classes = useMainStyles();

  return (
    <Container className={`${classes.mainContainer} ${classes.centerContainer}`}>
      <CenteredContent
        imgSrc={'/assets/icons/error-404.svg'}
        imgAlt={'not found'}
        titleText={'component.notFound.title'}
        descText={'component.notFound.description'} />
    </Container>
  );
};

export default NotFound;
