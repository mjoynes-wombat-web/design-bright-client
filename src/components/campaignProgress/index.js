/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import styled from 'styled-components';

import Line from '../svgs/line';

import colors from '../../consts/colors.scss';
import screenBreaks from '../../consts/screen-breaks.scss';
import orangeBrush1 from '../../assets/img/orange-brush1.png';

console.log(orangeBrush1);

const CampaignProgress = styled(({ percentFunded, className }) => (
  <div className={className}>
        <Line color={colors.graphite} height={0.25}/>
        <div className="funded" style={{
          width: `${percentFunded < 100
            ? percentFunded
            : 100}%`,
        }}></div>
      </div>
))`
height: ${props => props.height}rem;
position: relative;
margin: 0.625rem 0;
display: flex;
align-items: center;

@media screen and (min-width: ${screenBreaks.medium}) {
  height: ${props => (props.height * 1.25)}rem;
  margin: 0.75rem 0;
}

.funded {
  background-image: url(${orangeBrush1});
  height: 100%;
  padding: 0;
  position: absolute;
  top: 0;
  z-index: 20;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0;
`;

export default CampaignProgress;
