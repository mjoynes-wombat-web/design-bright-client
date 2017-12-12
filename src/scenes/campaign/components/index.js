/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// IMPORT PARTIALS
import { LoginModal, Message } from '../../../partials';

// IMPORT COMPONENTS
import CampaignBlocks from './campaignBlocks';
import Donate from './donate';
import CampaignHeader from './campaignHeader';

// IMPORT STYLING
import './scss/style.scss';

// CAMPAIGN PAGE COMPONENT
class Campaign extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {},
      contentInfo: {},
      campaignContent: [],
      fetched: {
        complete: false,
        code: null,
      },
      message: {
        type: '',
        message: '',
      },
      error: {
        type: '',
        message: '',
      },
      showDonationModal: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.isEnded = this.isEnded.bind(this);
    this.showDonationModal = this.showDonationModal.bind(this);
    this.updateCampaignDonations = this.updateCampaignDonations.bind(this);
  }

  // Before the component mounts get the campaign info and content from the server.
  componentWillMount() {
    const campaignId = this.props.match.params.id;
    this.setState({ campaignId });
    const campaignPreview = (this.props.match.url.search('preview') !== -1);

    const getUrl = campaignPreview
      ? `https://${window.location.hostname}:3000/api/campaigns/${campaignId}?accessToken=${this.props.userAuth.accessToken}`
      : `https://${window.location.hostname}:3000/api/campaigns/${campaignId}`;

    axios.get(getUrl)
      .then((campaignResults) => {
        const { campaignInfo, campaignContent } = campaignResults.data.data;
        campaignInfo.timeRemaining = (
          (((new Date(Date.parse(campaignInfo.startDate)) - new Date())
            / 1000 / 60 / 60 / 24) + campaignInfo.duration)
        );

        campaignInfo.donationPercentage = (
          (parseFloat(campaignInfo.donationsMade)
            / parseFloat(campaignInfo.fundingNeeded))
          * 100
        );
        this.setState({ campaignInfo });
        this.setState({ campaignContent });

        document.title = (campaignPreview ? `Preview ${campaignInfo.name} Campaign - Design Bright` : `${campaignInfo.name} Campaign - Design Bright`);

        this.setState({
          fetched: {
            complete: true,
            code: campaignResults.data.statusCode,
          },
        });
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          this.setState({
            fetched: {
              complete: true,
              code: error.response.data.statusCode,
            },
          });
        }
      });
  }

  // Update the campaign donations. This happens when a user donates.
  updateCampaignDonations(newAmount) {
    const campaignInfo = this.state.campaignInfo;
    campaignInfo.donationsMade = newAmount;
    campaignInfo.donationPercentage = (
      (parseFloat(campaignInfo.donationsMade)
        / parseFloat(campaignInfo.fundingNeeded))
      * 100
    );

    this.setState({ campaignInfo });
  }

  isEnded() {
    return ((new Date(Date.parse(this.state.campaignInfo.endDate))).getTime()
      <= (new Date()).getTime());
  }

  // When the donate button is clicked it either changes the state that allows the donation modal
  // to be show or it returns an error if the campaign hasn't started.
  showDonationModal() {
    if (this.state.campaignInfo.startDate) {
      document.body.style.overflow = 'hidden';
      this.setState({ showDonationModal: true });
    } else {
      this.setState({
        error: {
          type: 'campaign start',
          message: 'This campaign has not been started yet.',
        },
      });
      window.scroll(0, 0);
    }
  }

  render() {
    if (this.state.fetched.complete) {
      if (this.state.fetched.code === 200) {
        return (
          <main id="campaign" className={`small-12 columns${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
            <Message
              error={this.state.error}
              onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
              message={this.state.message}
              onClearError={() => this.setState({ error: { type: '', message: '' } })} />
            {this.state.showDonationModal && this.props.onRequireAuth()
              ? <Donate
                cancelDonation={
                  () => {
                    document.body.style.overflow = '';
                    this.setState({ showDonationModal: false });
                    window.onresize = null;
                  }
                }
                userInfo={this.props.userInfo}
                campaignId={this.state.campaignId}
                campaignInfo={this.state.campaignInfo}
                isEnded={this.isEnded}
                updateCampaignDonations={this.updateCampaignDonations}
                onNewMessage={message => this.setState({
                  message: {
                    type: 'campaign start',
                    message,
                  },
                })}
                onNewError={message => this.setState({
                  error: {
                    type: 'campaign start',
                    message,
                  },
                })} />
              : null}
            {this.state.showDonationModal && !this.props.onRequireAuth()
              ? <LoginModal
                actionName={'Please Login to Donate'}
                closeAction={() => {
                  document.body.style.overflow = '';
                  this.setState({ showDonationModal: false });
                }} />
              : null}
            <section className="row">
              <CampaignHeader
                isEnded={this.isEnded}
                campaignInfo={this.state.campaignInfo} />
              <div className="small-12 columns">
                <section className="campaign-content row">
                  <div className="small-12 medium-6 columns">
                    {this.state.campaignContent.map(
                      (content, i) => (
                        (i < ((this.state.campaignContent.length / 2) - 1))
                          ? <CampaignBlocks
                            campaignInfo={this.state.campaignInfo}
                            buttonAction={this.showDonationModal}
                            content={content}
                            isEnded={this.isEnded}
                            key={i} />
                          : null
                      ),
                    )}
                  </div>
                  <div className="small-12 medium-6 columns">
                    {this.state.campaignContent.map(
                      (content, i) => ((i > ((this.state.campaignContent.length / 2) - 2))
                        ? <CampaignBlocks
                          campaignInfo={this.state.campaignInfo}
                          buttonAction={this.showDonationModal}
                          content={content}
                          key={i} />
                        : null
                      ),
                    )}
                  </div>
                  <div className="small-12 columns">
                    <div className="row align-center">
                      <button
                        className={`primary small-11 medium-10 large-10 columns${this.isEnded()
                          ? ' disabled'
                          : ''}`}
                        onClick={this.showDonationModal}
                        disabled={this.isEnded()}>
                        {this.isEnded()
                          ? 'This campaign has ended.'
                          : 'Make a Donation'}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          </main >
        );
      } else if (this.state.fetched.code === 401) {
        return (
          <Redirect to={{
            pathname: '/campaigns',
            search: '?error=not-authorized',
          }} />
        );
      } else if (this.state.fetched.code === 404) {
        return (
          <Redirect to={{
            pathname: '/campaigns',
            search: '?error=invalid-campaign',
          }} />
        );
      } else if (this.state.fetched.code === 500) {
        return (
          <Redirect to={{
            pathname: '/campaigns',
            search: '?error=server-error',
          }} />
        );
      }
      return (
        <Redirect to={{
          pathname: '/campaigns',
          search: '?error=unknown',
        }} />
      );
    }
    return (
      <h1>Loading</h1>
    );
  }
}

export default Campaign;
