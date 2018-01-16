/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import yellowBrush2 from '../../../../assets/img/yellow-brush2.png';

import colors from '../../../../consts/colors.scss';
import screenBreaks from '../../../../consts/screen-breaks.scss';

import Heading from '../../../../components/heading';
import CampaignProgress from '../../../../components/campaignProgress';

const determineTimeLeft = (campaignInfo) => {
  const isEnded = endDate => ((new Date(Date.parse(endDate))).getTime()
    <= (new Date()).getTime());
  const campaign = campaignInfo;
  campaign.timeRemaining = (
    (new Date(Date.parse(campaign.endDate)) - Date.parse(new Date())) / 1000 / 60 / 60 / 24
  );

  if (isEnded(campaignInfo.endDate)) {
    return 'This campaign has ended.';
  } else if (campaignInfo.startDate === null) {
    return 'This campaign hasn\'t started yet.';
  } else if (campaignInfo.timeRemaining > 1) {
    return `${Math.round(campaignInfo.timeRemaining)} Days Left`;
  } else if ((campaignInfo.timeRemaining * 24) > 1) {
    return `${Math.round(campaignInfo.timeRemaining * 24)} Hours Left`;
  }
  return 'Less than an Hour left';
};

const percentFunded = (fundingNeeded, donationsMade) =>
  Math.round((parseFloat(donationsMade, 2) / parseFloat(fundingNeeded)) * 100);

const CampaignItem = styled(({ campaign, className }) => (
  <article className={className}>
    <Link to={`/campaign/${campaign.campaignId}`}>
      <div className="campaign-heading">
        <Heading type='h2' text={campaign.name} />
        <p className="days">
          <span className="details">
            {determineTimeLeft(campaign)}
          </span>
        </p>
      </div>
      <p className="campaign-description">
        {campaign.description}
      </p>
      <div className="main-image">
        <img src={campaign.image.src} alt={campaign.image.alt} />
      </div>
      <CampaignProgress
        percentFunded={percentFunded(campaign.fundingNeeded, campaign.donationsMade)}
        height={1} />
      <div className="campaign-details">
        <p className="funded">
          <span className="details">
            {percentFunded(campaign.fundingNeeded, campaign.donationsMade)}% Funded
          </span>
        </p>
        <p className="funding">
          <span className="details">
            ${campaign.fundingNeeded} Goal
          </span>
        </p>
      </div>
    </Link>
  </article>
))`
padding-bottom: 0.9375rem;
padding-top: 0.25rem;
width: 100%;
box-sizing: border-box;
transition: background-color 0.5s;
transition-timing-function: ease-in-out;

@media screen and (min-width: ${screenBreaks.medium}) {
  margin: 0 0.25rem;
}

a:link {
  border-bottom: none;
  display: block;
  padding: 0.75rem 1.25rem 0.5rem 1.25rem;

  &:hover {
    border-bottom: 0;
  }
}

@media screen and (min-width: ${screenBreaks.medium}) {
  width: calc(50% - 0.5rem);

  a:link {
    padding: 1rem 1.5rem 0.75rem 1.5rem;
  }
}

@media screen and (min-width: ${screenBreaks.large}) {
  width: calc(33.33% - 0.5rem);
}

&:hover {
  background-color: #F7F7F7;
  div {
    p{
      color: darken(${colors.graphite}, 20);
    }
  }
}
  .campaign-heading {
    display: flex;
    justify-content: space-between;
    
    h2 {
      margin: 0;

      span.underlined {
        background-position-y: 99%;
        line-height: 2rem;
      }
    }
  }

  .campaign-description {
    margin: 0.75rem 0;

    @media screen and (min-width: ${screenBreaks.medium}) {
      margin: 1rem 0;
    }
  }

  .campaign-details {
    display: flex;
    justify-content: space-between;
  }
  p {
    color: ${colors.graphite};

    &.days, &.funded, &.funding {
      margin-top: 0;
    }
    span {
      &.details {
        background-image: url(${yellowBrush2});
        background-size: 100% 100%;
        padding: 0.3rem 0.375rem 0.375rem 0.375rem;
        display: inline-block;
        font-weight: normal;
      }
    }
  }
  .main-image {
    border-radius: 0.25rem;
    border: 0.0625rem solid ${colors.lightGraphite};
    overflow: hidden;
    display: flex;
    align-items: center;
    max-height: 250px;
    padding: 0;
    width: 100%;
    margin-top: 1rem;
    flex: initial;

    @media screen and (min-width: ${screenBreaks.medium}) {
      margin-top: 0.625rem;
    }

    img {
      width: 100%;
    }
  }
}
`;

export default CampaignItem;
