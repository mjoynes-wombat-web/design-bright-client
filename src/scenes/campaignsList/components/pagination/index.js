/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

import './scss/style.scss';

import colors from '../../../../consts/colors.scss';

import { Angle } from '../../../../components/svgs/icons';

const Pagination = ({ pages, page }) => (
  <nav id="campaignsPgs">
    {pages.map((pageLink, i) => {
        switch (pageLink.type) {
          case 'prev':
            if (pageLink.link === '') {
              return (
                <a className="step" key={i}>
                </a>
              );
            }
            return (
              <Link
                className="step"
                to={pageLink.link}
                rel={pageLink.type}
                key={i}>
                <Angle color={colors.lightHydrangea} colorHover={colors.blueHydrangea}rotate='left' />
              </Link>
            );
          case 'next':
            if (pageLink.link === '') {
              return (
                <a className="step" key={i}>
                </a>
              );
            }
            return (
              <Link
                className="step"
                to={pageLink.link}
                rel={pageLink.type}
                key={i}>
                <Angle color={colors.lightHydrangea} colorHover={colors.blueHydrangea}rotate='right' />
              </Link>
            );
          case 'page':
            if (parseInt(page, 10) === pageLink.page) {
              return (
                <Link
                  to={pageLink.link}
                  key={i}
                  className="current">
                  {pageLink.page}
                </Link>
              );
            }
            return (
              <Link
                to={pageLink.link}
                key={i}>
                {pageLink.page}
              </Link>
            );
          default:
            return null;
        }
      })}
  </nav>
);

export default Pagination;
