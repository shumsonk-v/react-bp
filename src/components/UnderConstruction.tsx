import React from 'react';
import { setPageTitle } from 'src/stores/AppActions';
import CenteredContent from './CenteredContent';
import { connect } from 'react-redux';

const UnderConstruction = (props: any) => {
  return (
    <CenteredContent
      imgSrc={'/assets/icons/crane.svg'}
      imgAlt={'not found'}
      titleText={'component.construction.title'}
      descText={'component.construction.description'} />
  );
};

const dispatch2props = (dispatch: any) => ({
  setPageTitle: (title: string) => {
    dispatch(setPageTitle(title));
  }
});

export default connect(null, dispatch2props)(UnderConstruction);
