/* eslint-env browser */
import React from 'react';
import styled from 'styled-components';

import { colors, screenBreaks, globalStyle } from '../styleConsts';

globalStyle();

const fade = (animationName, opacityStart, opacityEnd) => `
@keyframes ${animationName} {
  from {
    visibility: hidden;
    opacity: ${opacityStart};
  }
  to {
    visibility: visible;
    opacity: ${opacityEnd};
  }
}
`;

const pulseTransparency = (animationName, opacityHigh, opacityLow) => `
@keyframes ${animationName} {
  0% {
    opacity: ${opacityHigh};
  }
  50% {
    opacity: ${opacityLow};
  }
  100% {
    opacity: ${opacityHigh};
  }
}
`;

const pulseText = (animationName, scaleTo) => `
@keyframes pulse-text {
  0% {
    transform: scale(1);
    color: ${colors.graphite};
  }
  50% {
    transform: scale(${scaleTo});
    color: ${colors.lightGraphite};
  }
  100% {
    transform: scale(1);
    color: ${colors.graphite};
  }
}
`;

const LoadingComponent = styled(
  ({ className, text, component }) => (
    <div id="loading" className={className}>
      <div className="wrapper">
        <div id="icon">
          <div id="bulb"></div>
          <div id="yellow-light-pulse">
            <div id="yellow-light"></div>
          </div>
          <div id="orange-glow-pulse">
            <div id="orange-glow"></div>
          </div>
        </div>
        <div>
          <h3 id="text">
            {text}
          </h3>
        </div>
      </div>
    </div>
  ),
) `
${fade('fade-in', 0, 1)}
${fade('fade-out', 1, 0)}

${pulseTransparency('pulse-orange', 1, 0.75)}
${pulseTransparency('pulse-yellow', 1, 0.75)}

${pulseText('pulse-text', 0.9)}
@media screen and (min-width: 40rem) {
  ${pulseText('pulse-text', 0.95)}
}

  text-align: center;
  background-color: rgba(255, 255, 255, 0.85);
  width: 100%;
  height: 100%;
  ${props => (props.component ? null : 'max-height: 100vh;')}
  position: ${props => (props.component ? 'relative' : 'fixed')};
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  animation-name:fade-in;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;


  .wrapper {
    padding: 2rem;
    position: absolute;
    h3 {
      font-family: 'Lato', sans-serif;
      font-size: ${props => (props.component ? '1.5rem' : '2rem')};
      font-weight: 300;
      margin: 0 auto;
      display: inline-block;
      color: ${colors.graphite};
      line-height: 2.2rem;
      animation-name: pulse-text;
      animation-delay: 1s;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;

      @media screen and (min-width: ${screenBreaks.medium}) {
        font-size: ${props => (props.component ? '1.75rem' : '2.25rem')};
      }
    }
    
    #icon {
      width: ${props => (props.component ? '75px' : '100px')};
      height: ${props => (props.component ? '75px' : '100px')};
      position: relative;
      margin: 0 auto;
    
      > div {
        width: 100%;
        height: 100%;
        position: absolute;
      }
    }
    
    #bulb {
      background-image: url(/assets/img/loading-bulb.png);
      background-size: 100% 300%;
      z-index: 3;
    }
    
    #yellow-light-pulse {
      animation-name: pulse-yellow;
      animation-delay: 2s;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      z-index: 2;
    
      #yellow-light {
        width: 100%;
        height: 100%;
        background-image: url(/assets/img/loading-bulb.png);
        background-size: 100% 300%;
        background-position-y: 50%;
        visibility: hidden;
        animation-name:fade-in;
        animation-duration: 0.20s;
        animation-delay: 1s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }
    }
    
    #orange-glow-pulse {
      animation-name: pulse-orange;
      animation-delay: 2s;
      animation-duration: 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      z-index: 1;
    
      #orange-glow {
        width: 100%;
        height: 100%;
        background-image: url(/assets/img/loading-bulb.png);
        background-size: 100% 300%;
        background-position-y: 100%;
        visibility: hidden;
        animation-name:fade-in;
        animation-duration: 1s;
        animation-delay: 1s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      }
    }
  }
`;

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test',
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    if (!this.props.component) {
      console.log(document.body);
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (!this.props.component) {
      document.body.style.overflow = 'hidden';
    }
  }

  render() {
    return <LoadingComponent text={this.props.text} component={this.props.component} />;
  }
}

export default Loading;
