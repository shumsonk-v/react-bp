import { makeStyles } from '@material-ui/core';

const useProfileStyles = makeStyles(theme => ({
  toTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const useAuthBoxStyles = makeStyles(theme => ({
  container: {
    borderWidth: '3px',
    borderStyle: 'dashed',
    borderColor: theme.palette.grey[300],
    borderRadius: '5px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100px',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    backgroundColor: theme.palette.grey[100]
  },
  icon: {
    fontSize: '62px',
    color: theme.palette.grey[400]
  },
  text: {
    color: theme.palette.grey[400]
  },
  hiddenName: {
    color: theme.palette.grey[400],
    fontSize: '2em'
  }
}));

const useExpStyles = makeStyles(theme => ({
  positionText: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '1.2em',
    color: theme.palette.grey[800],
    flex: '1 1 auto'
  },
  currentJobIcon: {
    paddingRight: theme.spacing(.75)
  },
  positionTextContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(.75)
  },
  subtitleText:{
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '1em'
  },
  companyText: {
    marginRight: theme.spacing(1)
  },
  locationText: {
    color: theme.palette.grey[600],
    fontSize: '.85em'
  },
  workPeriodBlock: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    }
  },
  expList: {
    margin: '0',
    padding: '0',
    listStyle: 'none'
  },
  expListItem: {
    marginBottom: theme.spacing(1)
  },
  workExpCard: {
    boxShadow: theme.shadows[2],
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.05)'
    }
  },
  currentJobText: {
    color: theme.palette.primary.main
  },
  expCardPrev: {
    opacity: '.7',
    backgroundColor: theme.palette.grey[200],
    '&:hover': {
      opacity: '1'
    }
  },
  expCardPrevExpanded: {
    opacity: '1',
    backgroundColor: '#ffffff'
  },
  durationTooltipLabel: {
    fontSize: '.85em'
  },
  expandDetails: {
    flexFlow: 'column wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    '& > *': {
      flex: '1 1 100%'
    }
  },
  techChip: {
    marginRight: theme.spacing(.75),
    marginBottom: theme.spacing(.75)
  }
}));

const useEduStyles = makeStyles(theme => ({
  eduList: {
    margin: '0',
    padding: '0',
    listStyle: 'none'
  },
  instituteName: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const useSkillStyles = makeStyles(theme => ({
  levelSkillCard: {
    padding: theme.spacing(1.5)
  },
  skillName: {
    fontWeight: theme.typography.fontWeightMedium
  },
  techChip: {
    marginRight: theme.spacing(.75),
    marginBottom: theme.spacing(.75)
  },
  libTitle: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

export { useProfileStyles, useAuthBoxStyles, useExpStyles, useEduStyles, useSkillStyles };
