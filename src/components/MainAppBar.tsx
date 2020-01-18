import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, ListItemIcon, Divider, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { APP_LOGOUT_REQUESTED } from 'src/sagas/AppSagas';
import { APP_SET_BUSY, APP_SET_LANGUAGE } from 'src/stores/AppActions';

import { IAppState, IAuthUser, ILanguage } from './../interfaces';
import ElevationScroll from './helpers/ElevationScroll';
import LoginDialog from './LoginDialog';
import LogoutDialog from './LogoutDialog';
import ProfileImage from './ProfileImage';
import { ExitToApp } from '@material-ui/icons';
import { LANGUAGES, DEFAULT_LANGUAGES } from 'src/constants';

// import RouteLink from './helpers/RouteLink';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
  dangerMenuStyle: {
    color: theme.palette.error.main
  },
  userProfileImage: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  userMenu: {
    width: '200px'
  },
  userMenuItemIcon: {
    width: '32px',
    height: '24px',
    minWidth: 'initial'
  },
  userMenuBlock: {
    paddingTop: theme.spacing(.75),
    paddingBottom: theme.spacing(.75),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  usernameText: {
    fontWeight: 600
  },
  iconButton: {
    marginRight: theme.spacing(1),
  },
  langIcon: {
    width: theme.spacing(3.4),
    height: theme.spacing(3.4),
  },
  langMenuIcon: {
    width: theme.spacing(2.4),
    height: theme.spacing(2.4),
  },
  langMenuItemIcon: {
    flexFlow: `row nowrap`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    width: '32px',
    height: '24px',
    minWidth: 'initial'
  },
  selectedLang: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      cursor: 'default'
    }
  }
}));


interface IMainAppBarProps extends IAppState {
  onOpenDrawer: () => void;
  logout?: (provider: any) => void;
  authMethod?: string | null;
  userInfo?: IAuthUser | null;
  setAppBusy: (isBusy: boolean) => void;
  updateLanguage: (lang: string) => void;
}

const MainAppBar = (props: IMainAppBarProps) => {
  const { t } = useTranslation();
  const { userInfo, initAuthCheck, onOpenDrawer, logout, authMethod, setAppBusy, currentLanguage, updateLanguage } = props;
  const classes = useStyles();
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [userMnuAncEl, setUserMnuAncEl] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(userMnuAncEl);
  const [langMenuAncEl, setLangMenuAncEl] = useState<null | HTMLElement>(null);
  const langMenuOpen = Boolean(langMenuAncEl);

  const openLogin = () => {
    setOpenLoginDialog(true);
  };

  const openLogout = () => {
    setOpenLogoutDialog(true);
    if (userMenuOpen) {
      setUserMnuAncEl(null);
    }
  };

  const handleLangClick = (lang: string) => {
    if (lang && lang !== currentLanguage) {
      i18next.changeLanguage(lang);
      updateLanguage(lang);
      window.localStorage.setItem('_rbp_lng_', lang);
    }
    if (langMenuOpen) {
      setLangMenuAncEl(null);
    }
  };

  const handleLoginClose = () => {
    setOpenLoginDialog(false);
  };

  const handleLogoutOk = () => {
    setOpenLogoutDialog(false);
    if (typeof logout === 'function') {
      setAppBusy(true);
      logout(authMethod);
    }
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMnuAncEl(event.currentTarget);
  };

  const handleLangMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenuAncEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMnuAncEl(null);
  };

  const handleLangMenuCLose = () => {
    setLangMenuAncEl(null);
  };

  const renderAuthContent = () => {
    return (<>
      <IconButton
        aria-label="current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleUserMenuClick}
        color="inherit" size="small">
        <ProfileImage />
      </IconButton>
      {renderUserMenu()}
    </>);
  };

  const renderAppBarConditionalContent = () => {
    if (!initAuthCheck) {
      return null;
    }

    if (userLoggedIn) {
      return renderAuthContent();
    }

    return <Button color="inherit" onClick={() => openLogin()}>{t('common.login')}</Button>;
  };

  const renderUserMenu = () => (
    <Menu
      id="user-menu-appbar"
      anchorEl={userMnuAncEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={userMenuOpen}
      onClose={handleUserMenuClose}
      classes={{ paper: classes.userMenu }}
    >
      <div className={`${classes.userMenuBlock}`}>
        <Typography variant="caption" display="block">
          {t('component.userMenu.lblWelcome')}
        </Typography>
        <Typography variant="body2" display="block" gutterBottom classes={{ root: classes.usernameText }}>
          {userInfo?.displayName || userInfo?.username}
        </Typography>
      </div>
      <Divider />
      <MenuItem onClick={() => openLogout()}>
        <ListItemIcon className={`${classes.userMenuItemIcon}`}>
          <ExitToApp color="error" fontSize="small" />
        </ListItemIcon>
        <Typography color="error" variant="inherit">{t('component.logout.btnLogout')}</Typography>
      </MenuItem>
    </Menu>
  );

  const renderLangMenu = () => {
    let currLang: ILanguage = LANGUAGES.find(lng => lng.lang === currentLanguage) || DEFAULT_LANGUAGES;

    const langList = LANGUAGES.map((lng, i) => {
      return (
        <MenuItem key={i} onClick={() => handleLangClick(lng.lang)}
          className={currentLanguage === lng.lang ? `${classes.selectedLang}` : ''}>
          <ListItemIcon className={`${classes.langMenuItemIcon}`}>
            <Avatar alt={lng.text} src={`/assets/icons/${lng.lang}.svg`} className={`${classes.langMenuIcon}`} />
          </ListItemIcon>
          <Typography variant="inherit">{lng.text}</Typography>
        </MenuItem>
      );
    });

    return (
      <>
        <IconButton
          aria-label="account of current user"
          aria-controls="lang-appbar"
          aria-haspopup="true"
          onClick={handleLangMenuClick}
          color="inherit" size="small"
          className={classes.iconButton}>
          <Avatar alt={currLang.text} src={`/assets/icons/${currLang.lang}.svg`} className={`${classes.langIcon}`} />
        </IconButton>
        <Menu
          id="lang-menu-appbar"
          anchorEl={langMenuAncEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={langMenuOpen}
          onClose={handleLangMenuCLose}
        >{langList}</Menu>
      </>
    )
  };

  useEffect(() => {
    if (userInfo) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
              onClick={() => onOpenDrawer()}>
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" className={classes.title}>{props.pageTitle ? t(props.pageTitle) : null}</Typography>
            {/*<Button color="inherit" component={RouteLink} to="/login">Login</Button>*/}
            {renderLangMenu()}
            {renderAppBarConditionalContent()}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <LoginDialog open={openLoginDialog} onLoginClose={handleLoginClose} />
      <LogoutDialog open={openLogoutDialog} onLogoutOk={handleLogoutOk} onLogoutCancel={handleLogoutCancel} />
    </>
  )
};

const state2props = (state: IAppState) => ({
  pageTitle: state.pageTitle,
  userInfo: state.auth ? state.auth.user : null,
  authMethod: state.auth ? state.auth.method : null,
  initAuthCheck: state.initAuthCheck,
  currentLanguage: state.currentLanguage
});

const dispatch2props = (dispatch: any) => ({
  logout: (method: any) => {
    dispatch({
      type: APP_LOGOUT_REQUESTED,
      payload: {
        method
      }
    });
  },
  setAppBusy: (isAppBusy: boolean) => {
    dispatch({
      type: APP_SET_BUSY,
      payload: {
        isAppBusy
      }
    })
  },
  updateLanguage: (lang: string) => {
    dispatch({
      type: APP_SET_LANGUAGE,
      payload: {
        lang
      }
    })
  }
});

export default connect(state2props, dispatch2props)(MainAppBar);
