import React from 'react';
import { Typography, List, ListItem, ListItemText, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CustomBox } from './helpers/CustomBox';
import { makeStyles } from '@material-ui/core/styles';
import CustomDivider from './helpers/CustomDivider';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles(theme => ({
  techItemName: {
    fontWeight: theme.typography.fontWeightMedium,
    display: 'inline-flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  linkIcon: {
    marginLeft: theme.spacing(.75)
  }
}));

const feTechStack = [
  { name: 'react', url: 'https://reactjs.org/' }, 
  { name: 'react_router', url: 'https://reacttraining.com/react-router/web/guides/quick-start' },
  { name: 'redux', url: 'https://redux.js.org/' },
  { name: 'redux_saga', url: 'https://redux-saga.js.org/' },
  { name: 'react_helmet', url: 'https://github.com/nfl/react-helmet' },
  { name: 'react_i18next', url: 'https://react.i18next.com/' },
  { name: 'material_ui', url: 'https://material-ui.com/' },
  { name: 'font_awesome', url: 'https://github.com/FortAwesome/react-fontawesome' }
];

const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4">{t('component.home.title1')}</Typography>
      <CustomBox mt={3}>
        <Typography variant="body1">{t('component.home.desc1')}</Typography>
      </CustomBox>
      <CustomDivider my={3} />
      <Typography variant="h5">{t('component.home.title2')}</Typography>
      <CustomBox>
        <List>
          {feTechStack.map((tech, i) => {
            return <ListItem key={i}>
              <ListItemText>
                <Typography variant="body1">
                  <Link href={tech.url} target="_blank" className={classes.techItemName}>
                    {t(`component.home.feStackItems.${tech.name}.name`)}
                    <LaunchIcon fontSize="small" classes={{ root: classes.linkIcon }} />
                  </Link>
                </Typography>
                <CustomDivider mb={1} />
                <Typography variant="body2">
                  {t(`component.home.feStackItems.${tech.name}.desc`)}
                </Typography>
              </ListItemText>
            </ListItem>;
          })}
          
        </List>
      </CustomBox>

      <CustomDivider mt={2} mb={2} />
      <Typography variant="h5">{t('component.home.title3')}</Typography>
      <CustomBox mt={1}>
        <Typography variant="body1">{t('component.home.desc3')}</Typography>
      </CustomBox>

      <CustomDivider mt={2} mb={2} />
      <Typography variant="h5">{t('component.home.title4')}</Typography>
      <CustomBox mt={1}>
        <Typography variant="body1">{t('component.home.desc4')}</Typography>
      </CustomBox>

      <CustomDivider mt={2} mb={2} />
      <Typography variant="h5">{t('component.home.title5')}</Typography>
      <CustomBox mt={1}>
        <Typography variant="body1">{t('component.home.desc5')}</Typography>
      </CustomBox>
    </>
  )
};

export default Home;
