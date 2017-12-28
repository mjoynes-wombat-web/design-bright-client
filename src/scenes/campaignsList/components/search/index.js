/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';

import SortOptions from '../sortOptions';

import './scss/style.scss';

import colors from '../../../../consts/colors.scss';

import { ChevronSquareDown } from '../../../../components/svgs/icons';
import Line from '../../../../components/svgs/line';

const Search = ({ state, showSortOpt, cancelSort }) => {
  if (state.search) {
    return (
      <section id="searchCampaigns">
        <h1>
          <span>
            Campaigns for
          </span>&nbsp;
          <span className="search">
            {state.search}
          </span>
        </h1>
        <h2 className="sort-method">
          <span>
            Sorted by
          </span>&nbsp;
          {state.showSort
            ? null
            : (
              <span onClick={showSortOpt} className="sortWrapper">
                <span className="sort">
                  {state.sort}
                </span>
                <span className="icon"><ChevronSquareDown color={colors.blueHydrangea} /></span>
              </span>
            )
          }
        </h2>
        {state.showSort
          ? <SortOptions
            state={state}
            cancelSort={cancelSort} />
          : null}
        <Line color={colors.graphite} type='hr' />
      </section>
    );
  }
  return <Redirect to={{
    pathname: '/campaigns/browse',
    search: `?sort=${state.sort}`,
  }} />;
};

export default Search;
