import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import MainNavContent from './MainNavContent';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const MainNav = (props: any) => {
  const classes = useStyles();

  const closeDrawer = () => (event: any) => {
    if (event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    props.onClose();
  };

  return (
    <>
      <Drawer open={props.open} onClose={closeDrawer()}>
        <div className={classes.list} role="presentation">
          <MainNavContent onCloseNavTriggered={closeDrawer()} />
        </div>
      </Drawer>
    </>
  )
};

export default MainNav;
