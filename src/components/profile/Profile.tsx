import React, { useState } from 'react';
import { Typography, Grid, Tooltip, Chip, Paper, Fab, Zoom } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CustomDivider from '../helpers/CustomDivider';
import { CustomBox } from '../helpers/CustomBox';
import { connect } from 'react-redux';
import { IAppState } from 'src/interfaces';
import { useTheme } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import { APP_GET_PROFILE_REQUESTED } from '../../sagas/AppSagas';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StarIcon from '@material-ui/icons/Star';
import Rating from '@material-ui/lab/Rating';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {
  useProfileStyles, useAuthBoxStyles, useExpStyles, useEduStyles, useSkillStyles,
} from './styles';

const state2props = (state: IAppState) => ({
  isAuthenticated: state.isAuthenticated,
  profile: state.myProfile,
});

const dispatch2props = (dispatch: any) => ({
  getProfile: () => {
    dispatch({
      type: APP_GET_PROFILE_REQUESTED,
    });
  }
});

const Loader = () => {
  const { t } = useTranslation();
  return <Typography component="span">{t('component.profile.loading')}</Typography>;
};

const Section = connect(state2props)((props: any) => {
  const { requireAuth, isAuthenticated } = props;
  const classes = useAuthBoxStyles();
  const { t } = useTranslation();

  return (
    requireAuth && !isAuthenticated ?
      <CustomBox className={classes.container} {...props}>
        <CustomBox mb={1}><LockIcon className={classes.icon} /></CustomBox>
        <Typography variant="h6" className={classes.text}>
          {t('component.profile.unauthorized', {
            section: t(`component.profile.${props.sectionTitle}`)
          })}
        </Typography>
      </CustomBox> :
      <CustomBox {...props}>
        <Typography variant="h5">{t(`component.profile.${props.sectionTitle}`)}</Typography>
        <CustomDivider mb={1} />
        {props.children}
      </CustomBox>
  );
});

const TechStack = (props: any) => {
  const { tech } = props;
  const techArr = tech ? tech.split(',') : [];
  const classes = useExpStyles();
  return techArr.map((t: any, i: number) => {
    const isMain = /[*]$/gi.test(t);
    return isMain ?
      <Chip key={i} size="small" label={t.substr(0, t.length - 1)} classes={{ root: classes.techChip }} icon={<StarIcon />} /> :
      <Chip key={i} size="small" label={t} classes={{ root: classes.techChip }} />;
  });
};

const WorkPeriod = (props: any) => {
  const { t } = useTranslation();
  const { from, to, duration } = props;
  const classes = useExpStyles();

  const fromDisplayArr = from.split('-');
  const fromText = `${t(`common.month.byNumberShort.${Number(fromDisplayArr[1])}`)} ${fromDisplayArr[0]}`;
  let durationText: string[] = [];
  if (duration.year) {
    durationText.push(t(`component.profile.durationYearText`, { year: duration.year }));
  }
  if (duration.month) {
    durationText.push(t(`component.profile.durationMonthText`, { month: duration.month }));
  }

  if (!to) {
    return <Tooltip title={durationText.join(' ')} placement="top" classes={{ tooltip: classes.durationTooltipLabel }}>
      <Typography component="span" className={classes.subtitleText}>{`${fromText} - ${t('common.present')}`}</Typography>
    </Tooltip>;
  }

  const toDisplayArr = to.split('-');
  const toText = `${t(`common.month.byNumberShort.${Number(toDisplayArr[1])}`)} ${toDisplayArr[0]}`;

  return <Tooltip title={durationText.join(' ')} placement="top" classes={{ tooltip: classes.durationTooltipLabel }}>
    <Typography component="span" className={classes.subtitleText}>{`${fromText} - ${toText}`}</Typography>
  </Tooltip>;
};

const WorkExperience = (props: any) => {
  const { profile } = props;
  const classes = useExpStyles();
  const [currentOpenedIndex, setCurrentOpenedIndex] = useState<number>(-1);

  const workExpChangeHandler = (idx: number) => {
    if (currentOpenedIndex !== idx) {
      setCurrentOpenedIndex(idx);
    } else {
      setCurrentOpenedIndex(-1);
    }
  };

  if (!profile || !profile.work_experience) {
    return <Loader />;
  }

  profile.work_experience.sort((a: any, b: any) => {
    if (a.from > b.from) {
      return -1;
    }
    if (a.from < b.from) {
      return 1;
    }
    return 0;
  });

  return profile.work_experience.map((exp: any, i: number) => {

    const renderDescContent = (wExp: any) => {
      const descList = wExp.description.split('\n');
      return descList.length === 1 ?
      <Typography variant="body2">{descList[0]}</Typography> :
      <ul className={classes.expList}>
        {descList.map((item: string, j: number) => <li key={j} className={`${classes.expListItem}`}>- {item}</li>)}
      </ul>
    };

    return <CustomBox key={i} mb={2}>
      <MuiExpansionPanel className={`${classes.workExpCard} ${i > 0 ? classes.expCardPrev : ''} ${i > 0 && i === currentOpenedIndex ? classes.expCardPrevExpanded : ''}`}
        expanded={currentOpenedIndex === i}
        onChange={() => workExpChangeHandler(i)}>
        <MuiExpansionPanelSummary>
          <Grid container>
            <Grid item xs={12} sm={8} md={9}>
              <div className={classes.positionTextContainer}>
                {i === 0 ? <CheckCircleIcon color="primary" className={classes.currentJobIcon} /> : null}
                <Typography component="span" className={`${classes.positionText} ${i === 0 ? classes.currentJobText : ''}`}>
                  {exp.last_position}
                </Typography>
              </div>
              <Typography component="span" className={`${classes.subtitleText} ${classes.companyText}`}>{exp.company_name}</Typography>
              <Typography component="span" className={`${classes.subtitleText} ${classes.locationText}`}>{exp.location}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3} classes={{ root: classes.workPeriodBlock }}>
              <WorkPeriod from={exp.from} to={exp.to} duration={exp.duration} />
            </Grid>
          </Grid>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails classes={{ root: classes.expandDetails }}>
          <CustomBox mb={2}>
            {renderDescContent(exp)}
          </CustomBox>
          <CustomBox>
            <TechStack tech={exp.tech} />
          </CustomBox>          
        </MuiExpansionPanelDetails>        
      </MuiExpansionPanel>
    </CustomBox>;
  });
  
};

const Educations = (props: any) => {
  const { profile } = props;
  const classes = useEduStyles();

  if (!profile) {
    return <Loader />;
  }

  const eduList = profile.educations && profile.educations.length ?
    profile.educations.map((edu: any, i: number) => {
      return (
        <li key={i}>
          <Typography variant="subtitle1" classes={{ root: classes.instituteName }}>{edu.institute_name}</Typography>
          <Typography variant="caption">{edu.degree}</Typography>
        </li>
      );
    }) : null;

  return eduList ? <ul className={classes.eduList}>{eduList}</ul> : null;
};

const Skills = (props: any) => {
  const { profile } = props;
  const { t } = useTranslation();
  const classes = useSkillStyles();
  
  if (!profile) {
    return <Loader />;
  }

  const { skills } = profile;
  const skillWithLevel = skills.filter((s: any) => s.level);
  skillWithLevel.sort((a: any, b: any) => {
    if (a.level > b.level) {
      return -1;
    }
    if (a.level < b.level) {
      return 1;
    }
    return 0;
  });
  const skillWithoutLevel = skills.filter((s: any) => !s.level);

  return (
    <>
      <Grid container spacing={2}>
        {skillWithLevel.map((skill: any, i: number) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Paper classes={{ root: classes.levelSkillCard }}>
                <CustomBox mb={1}>
                  <Typography variant="body1" classes={{ root: classes.skillName }}>{skill.name}</Typography>
                </CustomBox>
                <Rating value={skill.level} defaultValue={skill.level} max={5} readOnly={true} precision={.5} />
              </Paper>
            </Grid>
          );
        })}
        <Grid item xs={12}></Grid>
      </Grid>
      <CustomBox mb={1}>
        <Typography variant="body2" classes={{ root: classes.libTitle }}>{t('component.profile.tools')}</Typography>
      </CustomBox>
      {skillWithoutLevel.map((skill: any, i: number) => <Chip key={i} label={skill.name} classes={{ root: classes.techChip }} />)}
    </>
  );
};

const ProfileName = (props: any) => {
  const { profile, isAuthenticated } = props;
  const classes = useAuthBoxStyles();
  const { t } = useTranslation();

  if (!profile) {
    return <Loader />;
  }

  return <CustomBox mb={3}>
    <Typography variant="h3" className={isAuthenticated ? '' : classes.hiddenName}>
      {isAuthenticated ? profile.name : t('component.profile.hiddenName')}
    </Typography>
  </CustomBox>;
};

const Profile = (props: any) => {
  const { profile } = props;
  const classes = useProfileStyles();
  const trigger = useScrollTrigger({
    threshold: 100
  });
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const scrollToTopClickedHandler = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <>
      <ProfileName {...props} />
      <Section sectionTitle="summaryTitle">
        <Typography variant="body1">
          {profile?.summary || <Loader />}
        </Typography>
      </Section>

      <Section sectionTitle="experienceTitle" requireAuth={true} mt={4}>
        <CustomBox mt={1}>
          <WorkExperience {...props} />        
        </CustomBox>
      </Section>

      <Section sectionTitle="skillTitle" mt={4}>
        <CustomBox mt={2}>
          <Skills {...props} />
        </CustomBox>
      </Section>

      <Section sectionTitle="educationTitle" requireAuth={true} mt={4}>
        <CustomBox mt={1}>
          <Educations {...props} />
        </CustomBox>
      </Section>

      {!trigger ? null :
        <Zoom
          in={true}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${transitionDuration.exit}ms`,
          }}
          unmountOnExit
        >
          <Fab color="primary" aria-label="top" classes={{ root: classes.toTop }} onClick={() => scrollToTopClickedHandler()}>
            <ArrowUpwardIcon />
          </Fab>
        </Zoom>
        }
    </>
  );
};

export default connect(state2props, dispatch2props)(Profile);
