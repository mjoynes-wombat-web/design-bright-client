/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT HELPERS
import { campaignTimeLeft } from '../../../../helpers';

import Heading from '../../../../components/heading';
import CampaignProgress from '../../../../components/campaignProgress';

// CAMPAIGN HEADER COMPONENT
// The header for the campaign page.
const CampaignHeader = ({ campaignInfo, isEnded }) => (
  <section>
    <Heading type='h1' text={campaignInfo.name} />
    <CampaignProgress
        percentFunded={campaignInfo.donationPercentage}
        height={1} />
      <div className="campaign-details">
          <p className="details">{Math.round(campaignInfo.donationPercentage)}% Funded</p>
          <p className="details">
            {campaignTimeLeft(isEnded, campaignInfo)}
          </p>
          <p className="details">
            ${parseInt(campaignInfo.fundingNeeded, 10).toLocaleString()} Needed
          </p>
      </div>
  </section>
);

export default CampaignHeader;
