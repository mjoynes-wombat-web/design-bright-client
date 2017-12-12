/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import CampaignActions from './campaignActions';
import StopConfModal from './stopConfirmation';
import Message from '../../../partials/message';

import './scss/style.scss';

class MngCampaigns extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      nonprofitInfo: {},
      campaigns: {},
      fetched: false,
      stopModalMsg: '',
      showStopModal: false,
      currentStopId: null,
      message: {
        type: '',
        message: '',
      },
      error: {
        type: '',
        message: '',
      },
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.launchCampaign = this.launchCampaign.bind(this);
    this.stopCampaign = this.stopCampaign.bind(this);
    this.stopConfirm = this.stopConfirm.bind(this);
  }

  componentWillMount() {
    axios.get(`https://${window.location.hostname}:3000/api/nonprofits/campaigns/${this.props.userAuth.accessToken}`)
      .then((results) => {
        const { nonprofit, campaigns } = results.data.data;
        for (let i = 0; i < campaigns.length; i += 1) {
          campaigns[i].timeRemaining = (
            (((new Date(Date.parse(campaigns[i].startDate)) - new Date())
              / 1000 / 60 / 60 / 24) + campaigns[i].duration)
          );
        }
        document.title = `Manage ${nonprofit.name}'s Campaign - Design Bright`;
        this.setState({ campaigns });
        this.setState({ nonprofitInfo: nonprofit });
        this.setState({ fetched: true });
      })
      .catch(error => console.log(error));
  }

  launchCampaign(campaignId) {
    const accessToken = this.props.userAuth.accessToken;
    axios.patch(
      `https://${window.location.hostname}:3000/api/nonprofits/campaigns/launch/${campaignId}`,
      { accessToken },
    )
      .then((startCampaignResults) => {
        window.scrollTo(0, 0);
        this.setState({
          message: {
            type: 'start campaign',
            message: startCampaignResults.data.message,
          },
          error: {
            type: '',
            message: '',
          },
        });
        if (startCampaignResults.status === 200) {
          const campaigns = this.state.campaigns;
          const campaignPosition = campaigns
            .map(campaign => campaign.campaignId)
            .indexOf(campaignId);

          campaigns[campaignPosition].startDate = (new Date()).toISOString();
          this.setState({ campaigns });
        }
      })
      .catch((startCampaignErr) => {
        window.scrollTo(0, 0);
        this.setState({
          error: {
            type: 'start campaign',
            message: startCampaignErr.response.data.message,
          },
          message: {
            type: '',
            message: '',
          },
        });
      });
  }

  stopConfirm(campaignId) {
    const accessToken = this.props.userAuth.accessToken;
    axios.patch(
      `https://${window.location.hostname}:3000/api/nonprofits/campaigns/stop/${campaignId}`,
      { accessToken },
    )
      .then((stopCampaignResults) => {
        window.scrollTo(0, 0);
        this.setState({
          message: {
            type: 'start campaign',
            message: stopCampaignResults.data.message,
          },
          error: {
            type: '',
            message: '',
          },
        });
        if (stopCampaignResults.status === 200) {
          const campaigns = this.state.campaigns;
          const campaignPosition = campaigns
            .map(campaign => campaign.campaignId)
            .indexOf(campaignId);
          const date = new Date();
          campaigns[campaignPosition].endDate = date.toISOString();
          this.setState({
            campaigns,
            showStopModal: false,
            stopModalMsg: '',
            currentStopId: null,
          });
          document.body.style.overflow = '';
        }
      })
      .catch((stopCampaignErr) => {
        window.scrollTo(0, 0);
        this.setState({
          error: {
            type: 'start campaign',
            message: stopCampaignErr.response.data.message,
          },
          message: {
            type: '',
            message: '',
          },
        });
      });
  }

  stopCampaign(campaignId) {
    document.body.style.overflow = 'hidden';
    const campaigns = this.state.campaigns;
    const campaignPosition = campaigns
      .map(campaign => campaign.campaignId)
      .indexOf(campaignId);
    const campaign = this.state.campaigns[campaignPosition];
    this.setState({ showStopModal: true });

    if ((new Date(Date.parse(campaign.endDate))).getTime() >= (new Date()).getTime()) {
      const stopMsg = () => {
        if (campaign.timeRemaining >= 2) {
          return `There are still ${Math.floor(campaign.timeRemaining)} days left. Are you sure you want to stop this campaign early?`;
        } else if (campaign.timeRemaining >= 1) {
          return `There is still ${Math.floor(campaign.timeRemaining)} day left. Are you sure you want to stop this campaign early?`;
        } else if ((campaign.timeRemaining * 24) >= 2) {
          return `There are still ${Math.floor(campaign.timeRemaining * 24)} hours left. Are you sure you want to stop this campaign early?`;
        } else if ((campaign.timeRemaining * 24) >= 1) {
          return `There is still ${Math.floor(campaign.timeRemaining * 24)} hour left. Are you sure you want to stop this campaign early?`;
        }
        return 'There is less than an hour left. Are you sure you want to stop this campaign early?';
      };

      this.setState({
        stopModalMsg: stopMsg(),
        currentStopId: campaignId,
      });
    }
  }

  render() {
    if (this.props.onRequireAuth()) {
      if (this.props.userInfo.userType === 'non-profit') {
        if (this.state.fetched) {
          return (
            <main id="mngCampaigns" className={('ontouchstart' in document.documentElement) ? '' : ' no-touch'}>
              <Message
                error={this.state.error}
                onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
                message={this.state.message}
                onClearError={() => this.setState({ error: { type: '', message: '' } })} />
              {this.state.showStopModal
                ? <StopConfModal
                  text={this.state.stopModalMsg}
                  id={this.state.currentStopId}
                  confirmAction={campaignId => this.stopConfirm(campaignId)}
                  cancelAction={
                    () => {
                      document.body.style.overflow = '';
                      this.setState({
                        showStopModal: false,
                        stopModalMsg: '',
                        currentStopId: null,
                      });
                    }
                  } />
                : null}
              <section className="row">
                <div className="small-12 columns">
                  <div className="row align-middle main-heading">
                    <h1 className="expand columns">
                      <span className="underlined">
                        {this.state.nonprofitInfo.name}'s Campaigns
                      </span>
                    </h1>
                    <div className="large-4 show-for-large columns button primary">
                      <Link to="/campaign/create">
                        <span className="icon"></span>
                        <span className="text">Create Campaign</span>
                      </Link>
                    </div>
                  </div>
                </div>
                {this.state.campaigns.map(
                  (campaign, i) => <CampaignActions
                    name={campaign.name}
                    id={campaign.campaignId}
                    key={i}
                    launch={this.launchCampaign}
                    stop={this.stopCampaign}
                    startDate={campaign.startDate}
                    endDate={campaign.endDate} />,
                )}
                <div className="small-12 columns">
                  <div className="row  align-center">
                    <div className=" small-11 medium-10 large-8 hide-for-large columns button primary">
                      <Link to="/campaign/create">
                        <span className="icon"></span>
                        <span className="text">Create Campaign</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </main >
          );
        }
        return (
          <h1>Loading</h1>
        );
      }
      return (
        <Redirect to={{
          pathname: '/user/profile',
          search: '?origin=nonprofit-page',
        }} />
      );
    }
    return (
      <Redirect to={{
        pathname: '/login',
        search: '?origin=secure',
      }} />
    );
  }
}

export default MngCampaigns;
