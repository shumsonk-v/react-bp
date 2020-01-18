import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from 'src/interfaces';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  profileImage: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}));

const ProfileImage = (props: any) => {
  const classes = useStyles();
  const { user } = props;
  const profileImage = user ? user.profileImage : '';
  const profileName = user ? (user.displayName || user.username) as string | undefined : '';

  return (
    profileImage ?
    <Avatar alt={profileName} src={profileImage} className={classes.profileImage} /> :
    <AccountCircle classes={{ root: classes.profileImage }} />
  );
};

const state2props = (state: IAppState) => ({
  user: state.auth ? state.auth.user : null,
});

export default connect(state2props)(ProfileImage);