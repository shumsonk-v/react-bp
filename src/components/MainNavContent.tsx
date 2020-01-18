import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { IAppState } from './../interfaces';
import { Error, Home, HelpOutline } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';


// Declare menu list
const menuList: IMenuItem[] = [
  {
    text: 'component.home.lblMenu',
    to: '/',
    icon: Home,
    persistent: false
  },
  {
    text: 'component.mainNav.menu.jobs',
    to: '/jobs',
    auth: true,
    icon: ErrorOutlineIcon,
  },
  {
    text: 'component.mainNav.menu.companies',
    to: '/companies',
    auth: true,
    icon: ErrorOutlineIcon,
    tooltip: 'error.working'
  },
  {
    text: 'component.mainNav.menu.candidates',
    to: '/candidates',
    auth: true,
    icon: ErrorOutlineIcon,
    tooltip: 'error.working'
  },
  {
    divider: true
  },
  {
    text: 'component.mainNav.menu.settings',
    to: '/settings',
    auth: true,
    icon: ErrorOutlineIcon,
    tooltip: 'error.working'
  },
  {
    text: 'component.mainNav.menu.admin',
    to: '/admin',
    icon: SupervisorAccountIcon,
    auth: true
  },
  {
    text: 'component.mainNav.menu.about',
    to: '/about',
    icon: HelpOutline,
  },
  {
    divider: true // Set to true to render a divider line
  },
  {
    text: 'test.undefinedRoute',
    to: '/undefined-route',
    icon: Error,
    color: 'error'
  },
  {
    divider: true
  },
  {
    text: 'Source',
    to: 'https://github.com/shumsonk-v/react-bp',
    icon: () => <FontAwesomeIcon icon={faGithub} />,
    external: true
  }
];

// --- Styles ---
const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main
  },
  active: {
    color: theme.palette.action.active
  },
  disabled: {
    color: theme.palette.grey[500]
  },
  primary: {
    color: theme.palette.primary.main
  },
  secondary: {
    color: theme.palette.secondary.main
  },
  menuIcon: {
    minWidth: '38px',
    '& .svg-inline--fa': {
      fontSize: '1.4em',
      width: '24px',
      height: '24px'
    }
  }
}));

// --- Interfaces ---
interface IMenuItem {
  text?: string;
  to?: string;
  persistent?: boolean;  // Set to true to prevent sidebar form closing when item clicked
  auth?: boolean;
  icon?: any;
  divider?: boolean;  // Set to true to render a divider line
  color?: 'action' | 'disabled' | 'error' | 'inherit' | 'primary' | 'secondary';
  tooltip?: string;
  external?: boolean;
}

interface IMainNavContentProps extends RouteComponentProps {
  isAuthenticated?: boolean;
  onCloseNavTriggered?: (e: any) => void;
}

interface IListMenuItem {
  menu?: any;
  onClick?: () => void;
  selected?: boolean;
}

// --- Components ---
const MenuIcon = (props: any) => {
  const { menu } = props;
  const classes = useStyles();

  return !menu.icon ? null :
    <ListItemIcon classes={{ root: classes.menuIcon }}>
      <menu.icon color={menu.color || 'action'} />
    </ListItemIcon>;
};

const ListItemLinkContent = (props: any) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { menu } = props;
  const textClass = menu.color ? classes[menu.color] : '';

  return <>
    <MenuIcon menu={menu} />
    <ListItemText primary={t(menu.text)} className={textClass || ''} />
  </>
};

const ListItemLink = (props: any) => {
  const { menu, to, selected } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref: any) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  ) as any;
  
  return (
    <ListItem button component={renderLink} {...props}
      selected={selected}>
      <ListItemLinkContent menu={menu} />
    </ListItem>
  );
};

const ListMenuItem = (props: IListMenuItem) => {
  const { menu, selected } = props;

  return (
    menu.to && !menu.external ?
    <ListItemLink to={menu.to} selected={selected} {...props} /> :
    <ListItem button {...props}>
      <ListItemLinkContent menu={menu} />
    </ListItem>
  );
};

const MainNavContent = (props: IMainNavContentProps) => {
  const { onCloseNavTriggered, isAuthenticated, location } = props;

  const menuClicked = (mnu: any) => {
    if (mnu.external) {
      window.open(mnu.to, '_blank');
      return;
    }
    if (!mnu.persistent && typeof onCloseNavTriggered === 'function') {
      onCloseNavTriggered(true);
    }
  };
  
  return (
    <List component="nav">
      {menuList.map((mnu: any, i) => {
        return mnu.divider ?
          <Divider key={i} /> :
          (mnu.auth ?
            (isAuthenticated ?
              <ListMenuItem key={i} menu={mnu} onClick={() => menuClicked(mnu)} selected={location.pathname === mnu.to} /> :
              null) :
            <ListMenuItem key={i} menu={mnu} onClick={() => menuClicked(mnu)} selected={location.pathname === mnu.to} />
          )
      })}      
    </List>
  )
};

const state2props = (state: IAppState) => ({
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(connect(state2props)(MainNavContent));
