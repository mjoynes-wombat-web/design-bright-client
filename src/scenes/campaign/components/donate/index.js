/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

// IMPORT COMPONENTS
import DonateComponent from './components';

// DONATE COMPONENT
// Donate form and confirmation component using Stripe.JS.
const Donate = ({
  userInfo,
  cancelDonation,
  campaignId,
  campaignInfo,
  isEnded,
  onNewMessage,
  updateCampaignDonations,
  onNewError,
}) => (
  <StripeProvider apiKey='pk_test_KXQVwU6Pgt4ITIYPqFZTj6Oe'>
    <Elements>
      <DonateComponent
        userInfo={userInfo}
        cancelDonation={cancelDonation}
        campaignId={campaignId}
        campaignInfo={campaignInfo}
        isEnded={isEnded}
        onNewMessage={onNewMessage}
        updateCampaignDonations={updateCampaignDonations}
        onNewError={onNewError} />
    </Elements>
  </StripeProvider>
);

export default Donate;
