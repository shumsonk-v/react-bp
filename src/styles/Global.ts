import { createGlobalStyle } from 'styled-components'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #ececec;
    height: 100%;
  }
  body {
    height: 100%;
    background-color: transparent;
  }
`;

const customTheme = createMuiTheme({
  palette: {
    background: {
      default: '#ececec'
    }
  }
});


const useMainStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1
  },
  mainContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    backgroundColor: '#ffffff',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      minHeight: `calc(100vh - 48px)`
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: `calc(100vh - 64px)`
    }
  },
  centerContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const centeredContentImageScales = {
  sm: '180px',
  md: '220px',
  lg: '280px'
};

const useCenteredContentStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 'calc(100% - 3rem)',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '500px'
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px'
    },
  },
  imageBlock: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    flex: '1 0 50%',
    [theme.breakpoints.up('sm')]: {
      flex: `0 0 ${centeredContentImageScales.sm}`,
      maxWidth: centeredContentImageScales.sm
    },
    [theme.breakpoints.up('md')]: {
      flex: `0 0 ${centeredContentImageScales.md}`,
      maxWidth: centeredContentImageScales.md
    }
  },
  image: {
    maxWidth: '100%'
  },
  textBlock: {
    flex: '1 0 100%',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
      flex: `1 0 calc(100% - ${centeredContentImageScales.sm})`,
      maxWidth: `calc(100% - ${centeredContentImageScales.sm})`
    },
    [theme.breakpoints.up('md')]: {
      flex: `1 0 calc(100% - ${centeredContentImageScales.md})`,
      maxWidth: `calc(100% - ${centeredContentImageScales.md})`
    },
  },
  textTitle: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey[700]
  },
  textDesc: {
    color: theme.palette.grey[600]
  }
}));

export {
  GlobalStyle,
  customTheme,
  useMainStyles,
  useCenteredContentStyles,
};
