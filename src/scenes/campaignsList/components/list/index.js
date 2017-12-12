/* eslint-env browser */
import React from 'react';
import axios from 'axios';

import CampaignItem from '../campaignItem';
import Pagination from '../pagination';

import './scss/style.scss';

class List extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      campaigns: {},
      fetched: false,
      resultsErr: null,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    axios.get(`https://${window.location.hostname}:3000/api/campaigns/${this.props.getUrl}`)
      .then((getCampaignsResults) => {
        const { page, pages, campaigns } = getCampaignsResults.data.data;

        const pageLinks = () => {
          const links = [];
          if (page > 1) {
            links.push(
              {
                link: `/campaigns/${this.props.view}/${parseInt(page, 10) - 1}${window.location.search}`,
                type: 'prev',
              },
            );
          } else {
            links.push(
              {
                link: '',
                type: 'prev',
              },
            );
          }

          for (let i = 0; i < pages; i += 1) {
            links.push(
              {
                link: `/campaigns/${this.props.view}/${i + 1}${window.location.search}`,
                type: 'page',
                page: i + 1,
              },
            );
          }

          if (page < pages) {
            links.push(
              {
                link: `/campaigns/${this.props.view}/${parseInt(page, 10) + 1}${window.location.search}`,
                type: 'next',
              },
            );
          } else {
            links.push(
              {
                link: '',
                type: 'next',
              },
            );
          }
          return links;
        };
        return this.setState({
          campaigns,
          pages: pageLinks(),
          page,
          fetched: true,
        });
      })
      .catch(getCampaignsErr => this.setState({
        fetched: true,
        resultsErr: getCampaignsErr.response.data.message,
      }));
  }

  render() {
    if (this.state.fetched) {
      if (this.state.resultsErr) {
        return (
          <section id="campaignsList">
            <h2 id="List">{this.state.resultsErr}</h2>
          </section>
        );
      }
      return (
        <section id="campaignsList">
          {this.state.campaigns.map(
            (campaign, i) => <CampaignItem
              campaign={campaign} key={i} />,
          )}
          <Pagination
            pages={this.state.pages}
            page={this.state.page} />
        </section>
      );
    }
    return (
      <section id="campaignsList">
        <h2 id="List">Loading</h2>
      </section>
    );
  }
}

export default List;
