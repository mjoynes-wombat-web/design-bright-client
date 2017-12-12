/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import styled from 'styled-components';

import screenBreaks from '../../consts/screen-breaks.scss';
import colors from '../../consts/colors.scss';
import Logo from './components/logo';
import Menu from './components/menu';
import paperBg from './assets/img/paper-bg.png';
import Line from '../svgs/line';

// HEADER COMPONENT
// Header component with state.
const Header = styled(({ className }) => (
  <header className={`${className}${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
    <Logo />
    <Menu />
    <div className="orange-line">
      <Line color={colors.mauiOrange} scale={4} />
    </div>
  </header>
))`
background-image: url(${paperBg});
padding: 1.125rem 1.125rem 1.125rem 1rem;
position: relative;
z-index: 200;
display: flex;
justify-content: space-between;

@media screen and (min-width: ${screenBreaks.medium}) {
  padding: 1.125rem 1.125rem 1.375rem 1.125rem;
}

.orange-line {
  background-position-x: 50%;
  height: 1.125rem;
  position: absolute;
  width: 100%;
  bottom: -0.45rem;
  background-repeat: no-repeat;
  background-size: cover;
  left: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
}
`;

export default Header;
