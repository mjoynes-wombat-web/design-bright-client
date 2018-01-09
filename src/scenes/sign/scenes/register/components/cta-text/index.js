import React from 'react';
import styled from 'styled-components';

import colors from '../../../../../../consts/colors.scss';
import screenBreaks from '../../../../../../consts/screen-breaks.scss';

import Heading from '../../../../../../components/heading';

const CTAText = styled(({
  className,
  heading,
  text,
  textColor,
}) => (
<div className={`cta-text ${className}`}>
  <div className="wrapper">
    <div>
        <Heading
          type='h2'
          text={heading}
          color={textColor}/>
        <p>
          {text}
        </p>
      </div>
  </div>
</div>
))`
width: 100%;
order: 1;
margin: 1.75rem 0 1.5rem 0;
box-sizing: border-box;

@media screen and (min-width: ${screenBreaks.medium}) {
  padding-left: 2rem;
}

.wrapper {
  background-image: url(${props => props.image});
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: 100% 50%;
  background-color: ${props => props.bgColor};
  border-radius: 0.3rem;
  border: 0.0625rem solid $light-graphite;
  overflow: hidden;

  border-radius: 0.3rem;
  border: 0.0625rem solid ${colors.lightGraphite};
  overflow: hidden;
  max-width: 40rem;
  margin: 0 auto;

  > div {
    padding: 1.75rem 2rem;
    background-color: ${props => props.fgColor};

    h2 {
      font-size: 1.5rem;
      color: ${props => (props.textColor || colors.darkGraphite)};

      @media screen and (min-width: ${screenBreaks.medium}) {
        font-size: 1.625rem;
      }
    }

    p {
      color: $dark-graphite;
      text-shadow: 0 0 0.5rem ${props => props.bgColor};
      line-height: 1.125rem;
      margin-top: 0.75rem;
      font-weight: normal;
      color: ${props => (props.textColor || colors.darkGraphite)};

      @media screen and (min-width: ${screenBreaks.medium}) {
        line-height: 1.25rem;
        margin-top: 1rem;
      }
    }
  }
}

@media screen and (min-width: ${screenBreaks.medium}){
  order: 2;
  width: 50%;
  margin: 0 auto;
}

@media screen and (min-width: $large-break){
  width: 66.66%;
  margin: 0 auto;
}

h2 {
  margin-top: 0;
}

p {
  max-width: 32rem;
}
`;

export default CTAText;
