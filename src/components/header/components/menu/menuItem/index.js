/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { screenBreaks } from '../../../../styleConsts';

const MenuItem = styled(({ className, linkName, linkURL }) => (
  <Link to={linkURL} className={className}>{linkName}</Link>
))`
vertical-align: middle;
display: block;
padding: 0.75rem 1.375rem;
transition: background-color 0.5s, box-shadow 0.5s;
transition-timing-function: ease-in-out;

:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

@media screen and (min-width: ${screenBreaks.medium}) {
  padding: 0.4rem 0.5rem 0.5rem;
  width: auto;
  display: inline-block;

  :hover {
    background-color: transparent;
  }
}
`;

export default MenuItem;
