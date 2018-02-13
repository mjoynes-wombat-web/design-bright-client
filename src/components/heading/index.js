/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import styled from 'styled-components';

import colors from '../../consts/colors.scss';
import screenBreaks from '../../consts/screen-breaks.scss';

import Line from '../../components/svgs/line';

const Heading = styled(({
  className,
  type,
  text,
  color,
}) => {
  switch (type) {
    case 'h2':
      return (
        <h2 className={className}>
          <span className="underlined">
            {text}
            <Line color={color || colors.mauiOrange} />
          </span>
        </h2>
      );
    case 'h1':
    default:
      return (
        <h1 className={className}>
          <span className="underlined">
            {text}
            <Line color={color || colors.blueHydrangea} />
          </span>
        </h1>
      );
  }
})`
font-size: 1.125rem;
font-family: 'Lato', sans-serif;
font-weight: normal;

${({ type, color }) => {
    switch (type) {
      case 'h2':
        return `
        font-size: 1.125rem;
        margin: 0.875rem 0 0.25rem 0;
        color: ${color || colors.mauiOrange};

        @media screen and (min-width: ${screenBreaks.medium}) {
          margin: 1.126rem 0 0.375rem 0;
          font-size: 1.375rem;
        }

        span.underlined {
          background-image: url('/assets/img/orange-line.svg');
          background-size: 100% 0.25rem;
          padding:0 0.125rem 0.125rem 0;
        }
        `;
      case 'h1':
      default:
        return `
        font-size: 1.375rem;
        color: ${color || colors.blueHydrangea};
        margin:1rem 0;

        @media screen and (min-width: ${screenBreaks.small}) {
          font-size: 1.5rem;
        }

        @media screen and (min-width: ${screenBreaks.medium}) {
          font-size: 1.75rem;
          margin: 1.125rem 0;
        }

        span.underlined {
          background-size: 100% 0.3rem;
          padding:0 0.125rem 0.375rem 0;
        }
        `;
    }
  }}

  span.underlined {
    background-repeat: no-repeat;
    background-position: bottom;
    position: relative;

    svg {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  `;

export default Heading;

