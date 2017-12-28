/* eslint-env browser */
import React from 'react';

import SortOptions from '../sortOptions';

import './scss/style.scss';

import colors from '../../../../consts/colors.scss';

import { ChevronSquareDown } from '../../../../components/svgs/icons';
import Line from '../../../../components/svgs/line';

const Browse = ({ state, showSortOpt, cancelSort }) => (
  <section id="browseCampaigns">
    <h1>
      <span>
        Campaigns by
      </span>&nbsp;
      {state.showSort
        ? null
        : (
          <span onClick={showSortOpt} className="sortWrapper">
            <span className="sort">
              {state.sort}
            </span>
            <span className="icon">
              <ChevronSquareDown color={colors.lightHydrangea} colorHover={colors.blueHydrangea}/>
            </span>
          </span>
        )
      }
    </h1>
    {state.showSort
      ? <SortOptions
        state={state}
        cancelSort={cancelSort} />
      : null}
    <Line color={colors.graphite} type='hr' />
  </section>
);

export default Browse;
