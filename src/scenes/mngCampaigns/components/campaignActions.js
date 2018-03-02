/* eslint-env browser */
import React from 'react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';

import Heading from '../../../components/heading';
import { EditIcon, StartIcon, StopIcon, ViewIcon, PreviewIcon } from '../../../components/svgs/icons';

import colors from '../../../consts/colors.scss';
import screenBreaks from '../../../consts/screen-breaks.scss';

const CampaignActions = ({
  name,
  id,
  launch,
  stop,
  startDate,
  endDate,
  className,
}) => (
  <article className={className}>
      <Heading type="h2" text={name} />
      <div className="campaign-actions">
        <div className={`campaign-action${startDate ? ' stop' : ' launch'}`}>
          <button
            onClick={startDate
              ? () => stop(id)
              : () => launch(id)}
            disabled={
              ((new Date(Date.parse(endDate))).getTime()
                <= (new Date()).getTime())}>
            {startDate ? <StopIcon className="icon" /> : <StartIcon className="icon" />}
            <span className="text">{startDate ? 'Stop' : 'Launch'} Campaign</span>
          </button>
        </div>
        <div className="campaign-action edit">
          <Link to={`/campaign/edit/${id}`}>
            <EditIcon className="icon" />
            <span className="text">Edit Campaign</span>
          </Link>
        </div>
        <div className="campaign-action view">
          <Link to={`/campaign${startDate ? '' : '/preview'}/${id}`}>
            {startDate ? <ViewIcon className="icon" /> : <PreviewIcon className="icon" />}
            <span className="text">{startDate ? 'View' : 'Preview'} Campaign</span>
          </Link>
        </div>
      </div>
      {
        startDate !== null
          ? <p>
            Campaign Started on {(new Date(Date.parse(startDate))).toLocaleDateString()}.
          </p>
          : null
      }
      {
        ((new Date(Date.parse(endDate))).getTime() <= (new Date()).getTime())
          ? <p>
            Campaign Stopped on {(new Date(Date.parse(endDate))).toLocaleDateString()}.
          </p>
          : null
      }
  </article>
);

export default styled(CampaignActions)`
    position: relative;

&:not(:last-of-type) {
  padding-bottom: 1.5rem;
}

.campaign-actions {
  margin: 0.875rem 0;

  .campaign-action {
    a, button {
      font-weight: 300;
      display: flex;
      text-align: left;
      align-items: center;
      margin: 0.375rem 0 0 0;
      border: none;
      padding: 0.375rem;
      left: -0.375rem;
      position: relative;
      width: auto;
      cursor: pointer;
      transition: color 0.5s;
      width: fit-content;

      :hover {
        border: none;
      }

    .icon {
        height: 100%;
        width: 1.25rem;
        display: inline-block;
        padding: 0 0.5rem 0 0;

        * {
          transition: fill 0.5s;
        }
      }

      .text {
        font-size: 1.125rem;
        line-height: initial;
        border-bottom: 0.0625rem solid black;

        @media screen and (min-width: ${screenBreaks.medium}) {
          font-size: 1.25rem;
        }
      }
    }

    &.disabled {
      display: none;
    }

    &.launch button {
      color: ${colors.actionGreen};

      .icon * {
        fill: ${colors.actionGreen};
      }

      span.text { border-color: ${colors.actionGreen}; }

      &:hover {
        color: ${colors.darkActionGreen};

        .icon * { fill: ${colors.darkActionGreen}; }

        span.text { border-color: ${colors.darkActionGreen}; }
      }
    }

    &.stop button {
      color: ${colors.errorRed};

    .icon * { fill: ${colors.errorRed}; }

      span.text { border-color: ${colors.errorRed}; }

      &:hover {
        color: ${colors.darkErrorRed};

        .icon * { fill: ${colors.darkErrorRed}; }

        span.text { border-color: ${colors.darkErrorRed}; }
      }

      &:disabled {
        &.icon, &.text {
          color: ${colors.brightGraphite};
          border-color: ${colors.brightGraphite};
          cursor: not-allowed;

          * {  fill: ${colors.brightGraphite}; }
        }
      }
    }

    &.edit a, &.view a {
      color: ${colors.blueHydrangea};

      .icon * { fill: ${colors.blueHydrangea}; }

      span.text { border-color: ${colors.blueHydrangea}; }

      &:hover {
        color: ${colors.darkBlueHydrangea};

        span.text { border-color: ${colors.darkBlueHydrangea}; }

        .icon * { fill: ${colors.darkBlueHydrangea}; }
      }
    }
  }
}
`;
