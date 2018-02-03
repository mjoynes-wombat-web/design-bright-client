/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import screenBreaks from '../../../../../consts/screen-breaks.scss';
import colors from '../../../../../consts/colors.scss';
import { SearchIcon } from '../../../../svgs/icons';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: 'Search',
      searchSubmitted: false,
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onBlurSearch = this.onBlurSearch.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate() {
    if (this.state.searchSubmitted) {
      this.setState({ searchInput: 'Search', searchSubmitted: false });
    }
  }

  onChangeSearch(e) {
    const { target } = e;
    const { value, name } = target;

    this.setState({ [name]: value });
  }

  onClickSearch(e) {
    const { target } = e;
    const { value, name } = target;

    target.parentElement.classList.add('child-focused');

    target.setSelectionRange(0, value.length);

    if (value === 'Search') {
      this.setState({ [name]: '' });
    }
  }

  onBlurSearch(e) {
    const { target } = e;
    const { value, name } = target;

    target.parentElement.classList.remove('child-focused');

    if (value === '') {
      this.setState({ [name]: 'Search' });
    }
  }

  onSubmitSearch(e) {
    e.preventDefault();
    this.setState({ searchSubmitted: true });
  }

  render() {
    if (this.state.searchSubmitted) {
      return <Redirect to={{
        pathname: '/campaigns/search',
        search: `?search=${this.state.searchInput}`,
      }} />;
    }

    return (
      <form onSubmit={this.onSubmitSearch} className={this.props.className}>
        <input
          type="search"
          name="searchInput"
          id="search"
          value={this.state.searchInput}
          onChange={this.onChangeSearch}
          onClick={this.onClickSearch}
          onBlur={this.onBlurSearch} />
        <button type="submit" aria-label="Search">
          <SearchIcon id="searchIcon" />
        </button>
      </form>
    );
  }
}

const Search = styled(({ className }) => (
    <SearchForm className={className} />
))`
padding: 0.625rem 0.875rem;
display: flex;
transition: width 0.75s, left 0.75s, box-shadow 0.75s;
transition-timing-function: ease-in-out;
overflow: hidden;

:hover {
  background-color: rgba(0, 0, 0, 0.25);

  input:focus {
      background-color: ${colors.brightGraphite};
  }
}


@media screen and (min-width: ${screenBreaks.medium}) {
  padding: 0;
  position: absolute;
  width: calc(100% - 136.56px - 1rem);
  bottom: 0;
  left: calc(94.56px + 0.5rem);
  border-radius: 0.3rem;

  &.child-focused {
    width: 100%;
    left: 0;
  }

  :hover {
    background-color: transparent;

    input {
      background-color: rgba(255, 255, 255, 0.7);
      color: ${colors.graphite};
    }
  }
}

&.child-focused {

  @media screen and (min-width: ${screenBreaks.medium}) {
    box-shadow: 0.0625rem 0.0625rem 0.25rem #777777;
  }

  :hover button, button {
    svg#searchIcon {
      .background {
        fill: white;
      }
      .icon {
        fill: ${colors.brightGraphite};
      }
    }
  }
}

input {
  font-size: 1.5rem;
  line-height: 1.625rem;
  padding: 0.4rem 0.5rem 0.5rem 0.5rem;
  border-radius: 0.3rem 0 0 0.3rem;
  border: none;
  font-weight: 300;
  font-family: 'Lato', sans-serif;
  color: ${colors.lightGraphite};
  background: rgba(255, 255, 255, 0.5);
  transition: width 0.75s, background-color 0.5s, left 0.75s, color 0.5s;
  transition-timing-function: ease-in-out;
  display: block;
  z-index: 100;
  width: calc(100% - 2.5rem);

  @media screen and (min-width: ${screenBreaks.medium}) {
    border-radius: 0;
  }

  :active, :focus {
    color: #fff;
    background-color: ${colors.lightGraphite};

    @media screen and (min-width: ${screenBreaks.medium}) {
      background-color: ${colors.brightGraphite};
    }
    outline: none;
    width: calc(100% - 2.5rem);
    left: 0;
  }
}

button {
  border: none;
  border-radius: 0;
  border-radius: 0 0.3rem 0.3rem 0 ;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  padding: 0;
  z-index: 100;
  cursor: pointer;

  @media screen and (min-width: ${screenBreaks.medium}) {
    border-radius: 0;
  }

  :focus {
    outline: none;
  }

  svg#searchIcon {
    .background {
      fill: ${colors.lightGraphite};

      @media screen and (min-width: ${screenBreaks.medium}) {
        fill: ${colors.brightGraphite};
      }
      transition: fill 0.5s;
      transition-timing-function: ease-in-out;
    }
    .icon {
      fill: white;
      transition: fill 0.5s;
      transition-timing-function: ease-in-out;
    }
  }
}

:hover {
  button {
    svg#searchIcon {
      .background {
        fill: ${colors.brightGraphite};
  
          @media screen and (min-width: ${screenBreaks.medium}) {
            fill: ${colors.lightGraphite};
          }
      }
      .icon {
        fill: white;
      }
    }
  }
}
`;

export default Search;
