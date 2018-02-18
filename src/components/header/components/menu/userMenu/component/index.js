/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import colors from '../../../../../../consts/colors.scss';
import screenBreaks from '../../../../../../consts/screen-breaks.scss';
import { UserIcon } from '../../../../../svgs/icons';

// USER MENU COMPONENT
// Stateless component for the user menu in the header.
// Takes a requireAuth function for checking login, a userType login to determine
// which menu type to show and an onLogout function to log the user out.
const UserMenuItems = ({ onRequireAuth, userType, onLogout }) => {
  console.log(userType);
  if (onRequireAuth()) {
    if (userType === 'non-profit') {
      return (
        <ul className="user-menu">
          <div>
            <li><Link to="/user/profile">Profile</Link></li>
            <li><Link to="/user/manage-campaigns">Campaigns</Link></li>
            <li><Link to="/" onClick={onLogout}>Logout</Link></li>
          </div>
        </ul>
      );
    }
    return (
      <ul className="user-menu">
        <div>
          <li><Link to="/user/profile">Profile</Link></li>
          <li><a onClick={onLogout}>Logout</a></li>
        </div>
      </ul>
    );
  }
  return (
    <ul className="user-menu">
      <div>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </div>
    </ul>
  );
};

const UserMenu = styled(({
  className,
  onRequireAuth,
  onLogout,
  userInfo,
  mouseLeaveMenu,
  mouseOverMenu,
  onClickMenu,
}) => (
    <div
      onMouseLeave={() => mouseLeaveMenu('userMenu')}
      onMouseOver={e => mouseOverMenu(e, 'userMenu')}
      onClick={e => onClickMenu(e, 'userMenu')}
      className={className}
      id='userMenu'>
      {
        userInfo.picture === '/assets/img/user.svg' || !userInfo.picture
        ? <UserIcon id="userIcon" loggedIn={onRequireAuth()} />
        : <div id="userIcon">
          <img src={userInfo.picture} alt="User profile." />
        </div>
      }
      <UserMenuItems
        onRequireAuth={onRequireAuth}
        userType={userInfo.userType}
        onLogout={onLogout} />
    </div>
))`
position: relative;
line-height: 0rem;
padding: 0px;

#userIcon {
  display: none;
  border-radius: 0.3rem;
  overflow: hidden;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  transition: background-color 0.5s;
  transition-timing-function: ease-in-out;

  > * {
    transition: fill 0.5s;
    transition-timing-function: ease-in-out;
    pointer-events: none;
    width: 100%;
  }

  .userIcon {
    fill: ${colors.brightGraphite};
  }

  .close {
    opacity: 0;
    fill: white;
  }

  @media screen and (min-width: ${screenBreaks.medium}) {
    display: inline-block;
  }
}

ul.user-menu {
  width: auto;
  display: block;
  transition: left 1s;
  transition-timing-function: ease-in-out;

  @media screen and (min-width: ${screenBreaks.medium}) {
      background-color: transparent;
      position: absolute;
      right: -1.125rem;
      left: calc(1.125rem + 42px);
      padding-top: calc((2.125rem) - 0.5rem);
      top: 42px;
    }

  div {
    background-color: ${colors.brightGraphite};
    border-radius: 0 0 0 0.3rem;

    @media screen and (min-width: ${screenBreaks.medium}) {
      box-shadow: -0.0625rem 0.0625rem 0.25rem #777777;
      overflow: hidden;
    }

    li {
      display: block;

      :not(:first-child) {
        a, a:link {
          padding-top: 0.75rem; 
        }

        &:last-child {
          // Fix box shadow transitioning
          box-shadow: 0 0.13rem 0.2rem #777777;
          transition: box-shadow 0.5s;
          transition-timing-function: ease-in-out;

          @media screen and (min-width: ${screenBreaks.medium}) {
            border-radius: 0 0 0 0.3rem;
          }

          a, a:link, a:visited {
            padding-bottom: 0.875rem;
          }
        }
      }
      
      a, a:link, a:visited {
        cursor: pointer;
        color: white;
        padding: 0.75rem 1.375rem;
        text-align: left;
        display: block;
        line-height: initial;
        transition: background-color 0.5s, box-shadow 0.5s;
        transition-timing-function: ease-in-out;

        @media screen and (min-width: ${screenBreaks.medium}) {
          padding: 1rem 0.5rem 1rem 0.5rem;
          text-align: center;
        }
        
        :hover {
          background-color: rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}

&.hover {
  #userIcon {
    background-color: ${colors.brightGraphite};
  
    .userIcon {
      fill: white;
    }
  }

  &.touch {
    #userIcon {
      .userIcon {
        opacity: 0;
      }

      .close {
        opacity: 1;
      }
    }
  }

  ul {
    left: -25vw;

    @media screen and (min-width: ${screenBreaks.large}) {
      left: -15vw;
    }
  }
}
`;

export default UserMenu;
