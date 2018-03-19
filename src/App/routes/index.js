/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

// Import Google Analytics tracker.
import { gaTracker } from '../../helpers';

import Loading from '../../components/loading';

const LoadingPage = () => <Loading text="Loading Page" />;

const Advisor = Loadable({
  loader: () => import('../../scenes/advisor'),
  loading: LoadingPage,
});

const Campaign = Loadable({
  loader: () => import('../../scenes/campaign'),
  loading: LoadingPage,
});

const EditCampaign = Loadable({
  loader: () => import('../../scenes/editCampaign'),
  loading: LoadingPage,
});

const MngCampaigns = Loadable({
  loader: () => import('../../scenes/mngCampaigns'),
  loading: LoadingPage,
});

const CampaignsList = Loadable({
  loader: () => import('../../scenes/campaignsList'),
  loading: LoadingPage,
});

const Help = Loadable({
  loader: () => import('../../scenes/help'),
  loading: LoadingPage,
});

const Home = Loadable({
  loader: () => import('../../scenes/home'),
  loading: LoadingPage,
});

const References = Loadable({
  loader: () => import('../../scenes/references'),
  loading: LoadingPage,
});

const Register = Loadable({
  loader: () => import('../../scenes/sign/scenes/register'),
  loading: LoadingPage,
});

const Login = Loadable({
  loader: () => import('../../scenes/sign/scenes/login'),
  loading: LoadingPage,
});

const EditProfile = Loadable({
  loader: () => import('../../scenes/userProfile/scenes/edit'),
  loading: LoadingPage,
});

const ViewProfile = Loadable({
  loader: () => import('../../scenes/userProfile/scenes/view'),
  loading: LoadingPage,
});

// ROUTE COMPONENT
// Returns the a component depending on the url route.
const Routes = () => (
  <div className={('ontouchstart' in document.documentElement) ? '' : 'no-touch'}>
    <Switch>
      {/* HOME ROUTE */}
      <Route
        exact path='/'
        component={gaTracker(Home)} />
      {/* REGISTER ROUTE */}
      <Route
        exact
        path='/register'
        component={gaTracker(Register)}
      />
      {/* LOGIN ROUTE */}
      <Route
        exact
        path='/login'
        component={gaTracker(Login)} />
      {/* VIEW PROFILE ROUTE */}
      <Route
        exact
        path='/user/profile'
        component={gaTracker(ViewProfile)} />
      {/* EDIT PROFILE ROUTE */}
      <Route
        exact
        path='/user/profile/edit'
        component={gaTracker(EditProfile)} />
      {/* MANAGE CAMPAIGNS ROUTE */}
      <Route
        exact
        path='/user/manage-campaigns'
        component={gaTracker(MngCampaigns)} />
      {/* CREATE CAMPAIGN ROUTE */}
      <Route
        exact
        path='/campaign/create'
        component={gaTracker(EditCampaign)} />
      {/* EDIT CAMPAIGN ROUTE */}
      {/* Edits the campaign with the passed id. */}
      <Route
        exact
        path='/campaign/edit/:id'
        component={gaTracker(EditCampaign)} />
      {/* PREVIEW CAMPAIGN ROUTE */}
      {/* Previews the campaign with the passed id. */}
      <Route
        exact
        path='/campaign/preview/:id'
        component={gaTracker(Campaign)} />
      {/* CAMPAIGN ROUTE */}
      {/* Shows the campaign with the passed id. */}
      <Route
        exact
        path='/campaign/:id'
        component={gaTracker(Campaign)} />
      {/* CAMPAIGNS LIST PAGE ROUTE */}
      {/* Shows the campaign listed based on the view and the page. */}
      <Route
        path='/campaigns/:view/:page'
        component={gaTracker(CampaignsList)} />
      {/* CAMPAIGNS LIST ROUTE */}
      {/* Shows the first page of the campaign list based on the view when no page is specified. */}
      <Route
        path='/campaigns/:view'
        component={gaTracker(CampaignsList)} />
      {/* ADVISORS ROUTE */}
      {/* Shows the form to become an advisor. */}
      <Route
        path='/advisor'
        component={gaTracker(Advisor)} />
      {/* HELP ROUTE */}
      {/* Shows the hep page. */}
      <Route
        path='/help'
        component={gaTracker(Help)} />
      {/* REFERENCES ROUTE */}
      {/* Shows the image and content references. */}
      <Route
        path='/references'
        component={gaTracker(References)} />
    </Switch>
  </div>
);

export default Routes;
