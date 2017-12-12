/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// IMPORT SCENES
// Import route scenes.
import {
  Advisor,
  Campaign,
  EditCampaign,
  MngCampaigns,
  CampaignsList,
  Help,
  Home,
  References,
  Register,
  Login,
  EditProfile,
  ViewProfile,
} from '../../scenes';

// Import Google Analytics tracker.
import { gaTracker } from '../../helpers';


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
