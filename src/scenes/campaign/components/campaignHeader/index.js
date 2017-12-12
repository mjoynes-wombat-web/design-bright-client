/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT HELPERS
import { campaignTimeLeft } from '../../../../helpers';

// CAMPAIGN HEADER COMPONENT
// The header for the campaign page.
const CampaignHeader = ({ campaignInfo, isEnded }) => (
  <div className="columns small-12">
    <section className="row">
      <div className="small-12 columns">
        <h1>
          <span className="underlined">
            {campaignInfo.name}
          </span>
        </h1>
      </div>
      <div className="small-12 columns">
        <div className="progress">
          <div className="line small-12 columns"></div>
          <div className="funded columns" style={{
            width: `${campaignInfo.donationPercentage < 100 ? campaignInfo.donationPercentage : 100}%`,
          }}></div>
        </div>
      </div>
      <div className="small-12 columns">
        <div className="row align-justify campaign-details">
          <div className="shrink columns">
            <p className="details">{Math.round(campaignInfo.donationPercentage)}% Funded</p>
          </div>
          <div className="shrink columns">
            <p className="details">
              {campaignTimeLeft(isEnded, campaignInfo)}
            </p>
          </div>
          <div className="shrink columns">
            <p className="details">
              ${parseInt(campaignInfo.fundingNeeded, 10).toLocaleString()} Needed
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default CampaignHeader;
