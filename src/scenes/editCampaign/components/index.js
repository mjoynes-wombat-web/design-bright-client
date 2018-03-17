/* eslint-env browser */
import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import axios from 'axios';
import queryString from 'query-string';

import CampaignEditor from './editor';
import Message from '../../../components/message';
import Heading from '../../../components/heading';
import { Input, Label } from '../../../components/inputs';
import Button from '../../../components/button';

import './scss/style.scss';

const isNumber = (num) => {
  const numbers = String(num).match('[0-9]+');
  if (numbers) {
    return numbers[0] === String(num);
  }
  return false;
};
const numLength = (num, minLength, maxLength) =>
  String(num).length >= minLength && String(num).length <= maxLength;

class EditCampaign extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      nonprofitInfo: {},
      campaigns: {},
      campaignInfo: {
        campaignName: '',
        fundingNeeded: 100,
        campaignDuration: 10,
      },
      contentInfo: {},
      campaignContent: [],
      fetched: false,
      hasCampaign: false,
      campaignId: null,
      campaignCreated: false,
      campaignCreatedId: null,
      valid: false,
      editorData: {},
      message: {
        type: '',
        message: '',
      },
      error: {
        type: '',
        message: '',
      },
      campaignSaved: false,
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onChangeEditorData = this.onChangeEditorData.bind(this);
  }

  componentWillMount() {
    if ('id' in this.props.match.params) {
      const editCampaignId = parseInt(this.props.match.params.id, 10);
      this.setState({ valid: true });
      const { origin } = queryString.parse(this.props.location.search);
      if (origin === 'create-campaign') {
        this.setState({
          message: {
            type: 'campaign created',
            message: 'Your campaign was successfully created.',
          },
        });
      }

      axios.get(`https://${window.location.hostname}:3000/api/nonprofits/campaigns/${this.props.userAuth.accessToken}`)
        .then((results) => {
          this.setState({ campaigns: results.data.data.campaigns });
          this.setState({ nonprofitInfo: results.data.data.nonprofit });

          this.setState({ campaignId: editCampaignId });

          if (this.state.campaigns.find(campaign =>
            campaign.campaignId === parseInt(editCampaignId, 10))
          ) {
            this.setState({ hasCampaign: true });

            axios.get(`https://${window.location.hostname}:3000/api/campaigns/${editCampaignId}?accessToken=${this.props.userAuth.accessToken}`)
              .then((campaignResults) => {
                const { campaignInfo, campaignContent } = campaignResults.data.data;
                campaignInfo.fundingNeeded = parseFloat(campaignInfo.fundingNeeded);

                document.title = `Edit ${campaignInfo.name} Campaign - Design Bright`;

                this.setState({ campaignInfo });
                this.setState({
                  contentInfo: results.data.data.contentInfo,
                  campaignSaved: true,
                });
                this.setState({ campaignContent });
                this.setState({ fetched: true });
              })
              .catch(error => console.log(error));
          } else {
            this.setState({ hasCampaign: false });
            this.setState({ fetched: true });
          }
        })
        .catch(error => console.log(error));
    } else {
      this.setState({
        fetched: true,
        hasCampaign: true,
      });
    }
  }

  componentDidMount() {
    this.validate();
  }

  onChange(e) {
    const { target } = e;
    const { name } = target;
    let value;

    if (name === 'fundingNeeded') {
      value = target.value.replace(/\.|,|[^0-9.]/g, '');
      if (value === '') {
        value = 100;
      }
    } else {
      value = target.type === 'checkbox' ? target.checked : target.value;
    }

    const { campaignInfo } = this.state;
    campaignInfo[name] = value;
    this.setState(
      {
        campaignInfo,
        campaignSaved: false,
      },
      () => {
        if (this.validate()) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
      },
    );
  }

  onSubmit(e) {
    e.preventDefault();
    const { accessToken } = this.props.userAuth;
    if (this.state.campaignContent.length > 0) {
      axios.patch(
        `https://${window.location.hostname}:3000/api/campaigns/edit/${this.state.campaignInfo.campaignId}`,
        {
          campaignInfo: this.state.campaignInfo,
          campaignContent: this.state.editorData,
          accessToken,
        },
      )
        .then((editCampaignResults) => {
          window.scrollTo(0, 0);
          this.setState({
            message: {
              type: 'edit campaign',
              message: editCampaignResults.data.message,
            },
            campaignSaved: true,
          });
        })
        .catch((editCampaignErr) => {
          window.scrollTo(0, 0);
          this.setState({
            error: {
              type: 'edit campaign',
              message: editCampaignErr.response.data.message,
            },
          });
        });
    } else {
      axios.post(
        `https://${window.location.hostname}:3000/api/campaigns/create`,
        {
          newCampaign: {
            ...this.state.campaignInfo,
            content: this.state.editorData,
          },
          accessToken,
        },
      )
        .then((createCampaignResults) => {
          window.scrollTo(0, 0);
          this.setState({
            campaignCreated: true,
            campaignCreatedId: createCampaignResults.data.data.campaignId,
          });
          this.setState({
            message: {
              type: 'edit campaign',
              message: createCampaignResults.data.message,
            },
          });
        })
        .catch((createCampaignErr) => {
          window.scrollTo(0, 0);
          if (createCampaignErr.response.data.statusCode === 409) {
            const { campaignInfo } = this.state;
            campaignInfo.name = '';
            this.setState({
              campaignInfo,
            });
          }
          this.setState({
            error: {
              type: 'edit campaign',
              message: createCampaignErr.response.data.message,
            },
          });
        });
    }
  }

  onChangeEditorData(editorData, campaignSaved) {
    this.setState(
      {
        editorData,
        campaignSaved,
      },
      () => {
        if (this.validate()) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
      },
    );
  }

  validate() {
    if (this.state.campaignInfo.startDate) {
      if (this.state.editorData.document.nodes[0].nodes[0].ranges[0].text !== '') {
        return true;
      }
    } else if (
      this.state.campaignInfo.campaignName.length > 0
      && (isNumber(this.state.campaignInfo.campaignDuration)
        && numLength(this.state.campaignInfo.campaignDuration, 2, 2))
      && (isNumber(this.state.campaignInfo.fundingNeeded)
        && numLength(this.state.campaignInfo.fundingNeeded, 3, 6))
      && this.state.editorData.document.nodes[0].nodes[0].ranges[0].text !== ''
    ) {
      return true;
    }
    return false;
  }

  render() {
    if (this.state.campaignCreated) {
      return (
        <Redirect
          to={{
            pathname: `/campaign/edit/${this.state.campaignCreatedId}`,
            search: '?origin=create-campaign',
          }} />
      );
    } else if (this.props.onRequireAuth()) {
      if (this.props.userInfo.userType === 'non-profit') {
        if (this.state.fetched) {
          if (this.state.hasCampaign) {
            return (
              <main id="editCampaigns" className={`small-12 columns${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
                <Message
                  error={this.state.error}
                  onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
                  message={this.state.message}
                  onClearError={() => this.setState({ error: { type: '', message: '' } })} />
                <section className="main-content">
                  <form onSubmit={this.onSubmit}>
                    <div>
                      <Heading
                        type="h1"
                        text={this.state.campaignContent.length > 0
                          ? `Edit ${this.state.campaignInfo.name}'s Campaign`
                          : `Create ${this.state.campaignInfo.name
                            ? `${this.state.campaignInfo.name}'s`
                            : ''} Campaign`} />
                      {this.state.campaignInfo.startDate
                        ? (
                          <p className="message">
                            {((new Date(Date.parse(this.state.campaignInfo.endDate))).getTime()
      <= (new Date()).getTime())
                              ? 'This campaign has already ended so only it\'s content can be modified.'
                              : 'This campaign has already started so only it\'s content can be modified.'}
                          </p>
                        )
                        : null}
                    </div>
                    <section id="campaignInfo">
                    {this.state.campaignInfo.startDate
                      ? (
                        <div className="campaign-details">
                          <p className="title">Campaign Name:</p>
                          <p className="info">{this.state.campaignInfo.name}</p>
                          <p className="title">Campaign Duration:</p>
                          <p className="info">{this.state.campaignInfo.campaignDuration} Days</p>
                          <p className="title">Funding Needed:</p>
                          <p className="info">${this.state.campaignInfo.fundingNeeded}</p>
                          <p className="title">Start Date:</p>
                          <p className="info">
                            {(new Date(Date.parse(this.state.campaignInfo.startDate)))
                              .toLocaleDateString()}
                          </p>
                          {this.state.campaignInfo.endDate
                            ? (
                              <div>
                                <p className="title">End Date:</p>
                                <p className="info">
                                  {(new Date(Date.parse(this.state.campaignInfo.endDate)))
                                    .toLocaleDateString()}
                                </p>
                              </div>
                            )
                            : null}
                        </div>
                      )
                      : (
                        <div className="campaign-details">
                          <Input
                            onChange={this.onChange}
                            type='text'
                            inputLabel='Campaign Name'
                            value={this.state.campaignInfo.name}
                            width='20rem'
                            id='campaignName'
                            required />
                          <Input
                            onChange={this.onChange}
                            type='number'
                            inputLabel='Campaign Duration (Days)'
                            value={this.state.campaignInfo.campaignDuration}
                            width='10rem'
                            id='campaignDuration'
                            error={!(isNumber(this.state.campaignInfo.campaignDuration) && numLength(this.state.campaignInfo.campaignDuration, 2, 2)) ? 'The campaign duration must be between 10 and 99 days.' : null}
                            required />
                          <Input
                            onChange={this.onChange}
                            type='text'
                            inputLabel='Funding Needed'
                            value={`$${parseInt(this.state.campaignInfo.fundingNeeded, 10).toLocaleString()}`}
                            width='10rem'
                            id='fundingNeeded'
                            error={!(isNumber(this.state.campaignInfo.fundingNeeded) && numLength(this.state.campaignInfo.fundingNeeded, 3, 6)) ? 'Funding must be more than $100 but less than $1,000,000.' : null}
                            required />
                        </div>
                      )}
                    <div className="campaign-contents">
                      <Label id={'campaignEditor'} inputLabel={'Campaign Contents'} required />
                      <CampaignEditor
                        content={this.state.campaignContent}
                        campaignInfo={this.state.campaignInfo}
                        nonprofitInfo={this.state.nonprofitInfo}
                        campaignId={this.state.campaignId}
                        onChangeEditorData={this.onChangeEditorData} />
                    </div>
                  </section>
                  <Button
                    primary
                    type="submit"
                    disabled={(
                      (this.state.campaignCreated && this.state.campaignContent.length === 0)
                      || !this.state.valid
                      || this.state.campaignSaved)}
                    onClick={this.onSubmit}
                    error={!this.state.valid ? 'Please make sure you\'ve entered all your information.' : null}>
                      {this.state.campaignContent.length > 0
                          ? `${this.state.campaignSaved ? 'No Changes Made' : 'Save Changes'}`
                          : 'Create Campaign'}
                  </Button>
                  </form>
                </section>
              </main >
            );
          }
          return (
            <Redirect to={{
              pathname: '/manage-campaigns',
              search: '?origin=not-auth-to-edit',
            }} />
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

export default EditCampaign;
