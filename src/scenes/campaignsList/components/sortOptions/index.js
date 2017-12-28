/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../components/button';

import colors from '../../../../consts/colors.scss';

import Line from '../../../../components/svgs/line';

const SortOptions = ({ state, cancelSort }) => {
  const pageUrl = `/campaigns/${state.view}`;
  const query = () => {
    if (state.search) {
      return `?search=${state.search}&sort=`;
    }
    return '?sort=';
  };

  return (
    <div className="sortOptions">
      <div>
        <ul>
          {state.search
            ? (
              <li>
                <Link rel="nofollow" to={`${pageUrl}${query()}Relevance`}>
                  Relevance
                </Link>
              </li>
            )
            : null}
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Newest`}>
              Newest
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Percent Funded`}>
              Percent Funded
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Days Remaining`}>
              Days Remaining
            </Link>
          </li>
          <li>
            <Link rel="nofollow" to={`${pageUrl}${query()}Funding Needed`}>
              Funding Needed
            </Link>
          </li>
          <li>
            <Button
              cancel
              onClick={cancelSort}>
              Cancel
            </Button>
          </li>
        </ul>
        <Line color={colors.graphite} type='hr' />
      </div>
    </div>
  );
};

export default SortOptions;
