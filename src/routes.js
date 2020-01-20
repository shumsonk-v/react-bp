import Home from './components/Home';
import About from './components/About';
import Admin from './components/Admin';
import UnderConstruction from './components/UnderConstruction';
import Jobs from './components/Jobs';
import Companies from './components/Companies';
import Candidates from './components/Candidates';
import Settings from './components/Settings';
import Profile from './components/Profile';

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
    auth: true,
    data: {
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
    auth: true,
    data: {
      docTitle: 'component.jobs.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/companies',
    component: Companies,
    auth: true,
    data: {
      docTitle: 'component.companies.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/candidates',
    component: Candidates,
    auth: true,
    data: {
      docTitle: 'component.candidates.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/settings',
    component: Settings,
    auth: true,
    data: {
      docTitle: 'component.settings.pageTitle',
      isCenteredContent: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    auth: true,
    data: {
      docTitle: 'component.profile.pageTitle'
    }
  }
];

export default routes;
