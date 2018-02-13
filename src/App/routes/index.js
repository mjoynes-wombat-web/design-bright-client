/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

// Import Google Analytics tracker.
import { gaTracker } from '../../helpers';

const Loading = () => <div>Loading...</div>;

const Advisor = Loadable({
  loader: () => import('../../scenes/advisor'),
  loading: Loading,
});

const Campaign = Loadable({
  loader: () => import('../../scenes/campaign'),
  loading: Loading,
});

const EditCampaign = Loadable({
  loader: () => import('../../scenes/editCampaign'),
  loading: Loading,
});

const MngCampaigns = Loadable({
  loader: () => import('../../scenes/mngCampaigns'),
  loading: Loading,
});

const CampaignsList = Loadable({
  loader: () => import('../../scenes/campaignsList'),
  loading: Loading,
});

const Help = Loadable({
  loader: () => import('../../scenes/help'),
  loading: Loading,
});

const Home = Loadable({
  loader: () => import('../../scenes/home'),
  loading: Loading,
});

const References = Loadable({
  loader: () => import('../../scenes/references'),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import('../../scenes/sign/scenes/register'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('../../scenes/sign/scenes/login'),
  loading: Loading,
});

const EditProfile = Loadable({
  loader: () => import('../../scenes/userProfile/scenes/edit'),
  loading: Loading,
});

const ViewProfile = Loadable({
  loader: () => import('../../scenes/userProfile/scenes/view'),
  loading: Loading,
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
