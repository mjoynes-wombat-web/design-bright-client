/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { screenBreaks } from '../styleConsts';

import greyBrush from '../../assets/img/grey-brush.png';

// FOOTER COMPONENT
// Stateless site footer component.
const Footer = styled(
  ({ className }) => (
    <footer className={`${className}${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
      <nav>
        <p><Link to="/advisor">Become an Advisor</Link></p>
        <p><Link to="/help">Need Help?</Link></p>
      </nav>
      <div>
        <p><span>© 2017 by Simeon Smith</span></p>
        <p><Link to="/references">Image and Content References</Link></p>
      </div>
    </footer>
  ),
) `
  background-image: url(${greyBrush});
  background-position-x: calc(100% - 50%);
  background-size: auto 120%;
  color: white;
  padding-top: 1.5rem;
  height: auto;
  background-repeat: none;
  position: absolute;
  bottom:0;
  width: 100%;

  @media screen and (min-width: ${screenBreaks.medium}) {
    padding-top: 2rem;
  }

  &.no-touch {
    a {
      &:link:hover, &visited:hover {
        border-bottom: 0.06rem solid white;
      }
    }
  }

  a {
    &:link, &:visited, &:link:hover, &:visited:hover {
      color: white;
      border-bottom: none;
    }
  }

  nav {
    display: flex;
    justify-content: space-around;
    p {
      
      margin: 0;

      a {
        &:link, &:visited, &:link:hover, &:visited:hover {
          color: white;
          border-bottom: none;
          font-weight: normal;
    
          @media screen {
            font-size: 0.875rem;
          }
    
          @media screen and (min-width: ${screenBreaks.medium}) {
            font-size: 1.125rem;
          }
        }
      }  
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    p {
      margin:0.5rem 1rem;
      font-size:0.875rem;
      font-weight: 300;

      
       a:hover {
          font-weight: 300;
          border-bottom: 0.0625rem solid white;
        }
      }
  
      @media screen and (min-width: ${screenBreaks.medium}) {
        font-size: 1rem;
      }
    }
  }
`;

export default Footer;
