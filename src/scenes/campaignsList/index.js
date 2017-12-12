/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

import Browse from './components/browse';
import Search from './components/search';
import List from './components/list';

import './scss/style.scss';

class CampaignsList extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      page: '',
      view: '',
      search: '',
      sort: '',
      getUrl: '',
      showSort: false,
      sortMethods: ['Relevance', 'Newest', 'Percent Funded', 'Days Remaining', 'Funding Needed'],
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    const { search, sort } = queryString.parse(this.props.location.search);
    const { view, page } = this.props.match.params;

    const setSort = () => {
      if (this.state.sortMethods.indexOf(sort) !== -1) {
        if (!search && sort === 'Relevance') {
          return this.state.sortMethods[1];
        }
        return sort;
      } else if (search) {
        return this.state.sortMethods[0];
      }
      return this.state.sortMethods[1];
    };

    const setPage = () => (Number.isInteger(parseInt(page, 10)) ? parseInt(page, 10) : 1);

    document.title = `${view.slice(0, 1).toUpperCase()}${view.slice(1, view.length)} Campaigns - Pg. ${page || 1} - Design Bright`;

    const getUrl = () => {
      if (view === 'search') {
        return `?page=${setPage()}&search=${search}&sort=${setSort()}`;
      }
      return `?page=${setPage()}&sort=${setSort()}`;
    };

    this.setState({
      view,
      page: setPage(),
      search,
      sort: setSort(),
      getUrl: getUrl(),
    });
  }

  render() {
    const { sort } = queryString.parse(this.props.location.search);
    if (['search', 'browse'].indexOf(this.state.view) === -1) {
      if (this.state.search) {
        return <Redirect to={{
          pathname: '/campaigns/search',
          search: `?search=${this.state.search}&sort=${this.state.sort}`,
        }} />;
      }
      return <Redirect to={{
        pathname: '/campaigns/browse',
        search: `?sort=${this.state.sort}`,
      }} />;
    } else if (this.state.sort !== sort) {
      if (this.state.search) {
        return <Redirect to={{
          pathname: '/campaigns/search',
          search: `?search=${this.state.search}&sort=${this.state.sort}`,
        }} />;
      }
      return <Redirect to={{
        pathname: '/campaigns/browse',
        search: `?sort=${this.state.sort}`,
      }} />;
    }
    return (
      <main id="campaignsPage">
        {this.state.view === 'browse'
          ? <Browse
            state={this.state}
            showSortOpt={() => this.setState({ showSort: true })}
            cancelSort={() => this.setState({ showSort: false })} />
          : null}
        {this.state.view === 'search'
          ? <Search
            state={this.state}
            showSortOpt={() => this.setState({ showSort: true })}
            cancelSort={() => this.setState({ showSort: false })} />
          : null}
        <List
          getUrl={this.state.getUrl}
          view={this.state.view} />
      </main>
    );
  }
}

export default CampaignsList;
