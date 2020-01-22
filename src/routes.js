import Home from './components/Home';
import About from './components/About';
import Admin from './components/Admin';
import UnderConstruction from './components/UnderConstruction';
import Jobs from './components/Jobs';
import Companies from './components/Companies';
import Candidates from './components/Candidates';
import Settings from './components/Settings';
import Profile from './components/profile/Profile';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    data: {
      docTitle: 'component.home.pageTitle'
    }
  },
  {
    path: '/about',
    component: About,
    data: {
      docTitle: 'component.about.pageTitle'
    }
  },
  {
    path: '/admin',
    component: Admin,
    data: {
      auth: true,
      docTitle: 'component.admin.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/under-construction',
    component: UnderConstruction,
    data: {
      docTitle: 'component.construction.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/jobs',
    component: Jobs,
    data: {
      auth: true,
      docTitle: 'component.jobs.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/companies',
    component: Companies,
    data: {
      auth: true,
      docTitle: 'component.companies.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/candidates',
    component: Candidates,
    data: {
      auth: true,
      docTitle: 'component.candidates.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/settings',
    component: Settings,
    data: {
      auth: true,
      docTitle: 'component.settings.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    data: {
      docTitle: 'component.profile.pageTitle'
    }
  }
];

export default routes;
