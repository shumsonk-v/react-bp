import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { setPageTitle, setDocTitle } from 'src/stores/AppActions';

import { IAppState } from './../../interfaces';
import { Container } from '@material-ui/core';
import { useMainStyles } from 'src/styles';
import { useTranslation } from 'react-i18next';

function RouteWithSubRoutes(route: any) {
  const classes = useMainStyles();
  const { t } = useTranslation();
  const { auth, isAuthenticated } = route;

  const RenderRoute = (props: any) => {
    const { route } = props;
    const { data } = route;
    const { isCenteredContent } = data;

    return (
      route.noContainer ?
      <route.component {...props} routes={route.routes} /> :
      <Container className={`${classes.mainContainer} ${isCenteredContent ? classes.centerContainer : ''}`}>
        <route.component {...props} routes={route.routes} />
      </Container>
    )
  };

  const isRoleAllowed = (rt: any): boolean => {
    if (!auth && !isAuthenticated) {
      return true;
    }

    const { user } = auth;

    if (user && rt.data?.only) {
      const routeRoles = typeof rt.data.only === 'string' ? [rt.data.only] : rt.data.only;
      return routeRoles.includes(user.role);
    }

    return true;
  };

  return (
    <Route
      path={route.path}
      exact={route.exact || false}
      render={(props) => {
        if (route.data?.title) {
          route.setPageTitle(route.data?.title ? t(route.data?.title) : '');
        }
        if (route.data?.docTitle) {
          route.setDocTitle(t(route.data?.docTitle || 'common.untitled'));
        }

        if (route.auth) {
          // pass the sub-routes down to keep nesting
          return isAuthenticated && isRoleAllowed(route) ?
            <RenderRoute route={route} {...props} /> :
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />;
        }

        return <RenderRoute route={route} {...props} />;
      }}
    />
  );
}

const state2props = (state: IAppState) => ({
  isAuthenticated: state.isAuthenticated,
  auth: state.auth
});

const dispatch2props = (dispatch: any) => ({
  setPageTitle: (title: string) => {
    dispatch(setPageTitle(title));
  },
  setDocTitle: (title: string) => {
    dispatch(setDocTitle(title));
  },
})

export default connect(state2props, dispatch2props)(RouteWithSubRoutes);
