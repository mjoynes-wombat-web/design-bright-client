/* eslint-env browser */
import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import Link from 'react-router-dom/Link';
import queryString from 'query-string';
import axios from 'axios';

import Message from '../../../../../components/message';
import Heading from '../../../../../components/heading';
import { UploadIcon, EditIcon } from '../../../../../components/svgs/icons';

import './scss/style.scss';

class ViewProfile extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);
    this.state = {
      profilePhoto: '',
      newProfilePhoto: {},
      loadingProfilePhoto: false,
      fetched: false,
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
    this.changeProfilePhoto = this.changeProfilePhoto.bind(this);
  }

  componentWillMount() {
    document.title = this.props.userInfo.userType === 'non-profit'
      ? `${this.props.userInfo.nonProfitName}'s Profile - Design Bright`
      : `${this.props.userInfo.firstName} ${this.props.userInfo.lastName}'s Profile - Design Bright`;
    this.props.onGetUserInfo(() => this.setState({ fetched: true }));
  }

  componentDidMount() {
    const search = queryString.parse(this.props.location.search);
    if ('origin' in search) {
      switch (search.origin) {
        case 'register':
          return this.setState({
            message: {
              type: 'origin register',
              message: 'You can\'t create a new user while logged in.',
            },
            error: {
              type: '',
              message: '',
            },
          });
        case 'login':
          return this.setState({
            message: {
              type: 'origin login',
              message: 'You are already logged in.',
            },
            error: {
              type: '',
              message: '',
            },
          });
        case 'nonprofit-page':
          return this.setState({
            message: {
              type: 'origin nonprofit-page',
              message: 'You aren\'t authorized to access that page.',
            },
            error: {
              type: '',
              message: '',
            },
          });
        default:
          return null;
      }
    }
    return null;
  }

  changeProfilePhoto(e) {
    const { target } = e;
    const value = target.files[0];

    this.setState(
      {
        newProfilePhoto: value,
      },
      () => {
        const formData = new FormData();
        formData.append('file', this.state.newProfilePhoto);
        formData.append('accessToken', this.props.userAuth.accessToken);
        this.setState({ loadingProfilePhoto: true });
        axios.patch(
          `https://${window.location.hostname}:3000/api/users/upload/photo/`,
          formData,
          {
            headers:
            { 'Content-Type': 'multipart/form-data' },
          },
        )
          .then((postImgResponse) => {
            this.setState({
              message: {
                type: 'profile image',
                message: postImgResponse.data.message,
              },
              error: {
                type: '',
                message: '',
              },
              loadingProfilePhoto: false,
            });
            this.props.onGetUserInfo();
          })
          .catch(postImgErr => this.setState({
            error: {
              type: 'profile image',
              message: postImgErr.response.data.message,
            },
            message: {
              type: '',
              message: '',
            },
            loadingProfilePhoto: false,
          }));
      },
    );
  }

  render() {
    if (this.props.onRequireAuth()) {
      if (Object.keys(this.props.userInfo).length > 0) {
        return (
          <main id="profile">
            <Message
              error={this.state.error}
              onClearMessage={() => this.setState({ message: { type: '', message: '' } })}
              message={this.state.message}
              onClearError={() => this.setState({ error: { type: '', message: '' } })} />
            <section className="main-content">
              <div className="profile-img-wrapper">
                <img
                  src={this.state.loadingProfilePhoto
                    ? '/assets/img/spinner.svg'
                    : this.props.userInfo.picture}
                  alt={`${
                    this.props.userInfo.userType === 'non-profit'
                      ? this.props.userInfo.nonProfitName
                      : `${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`}'s Profile`}
                  className="profile-img" />
                <button type="button" className="edit" onClick={(e) => {
                  e.preventDefault(e);
                  document.getElementById('newProfilePhoto').click();
                }}>
                  <UploadIcon /> Upload Profile Photo
                </button>
                <input id="newProfilePhoto" type="file" onChange={this.changeProfilePhoto} />
              </div>
              <div className="profile-details">
                <div className="profile-header">
                  <Heading
                    type='h1'
                    text={`${this.props.userInfo.userType === 'non-profit'
                    ? this.props.userInfo.nonProfitName
                    : `${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`
                  }'s Profile`} />
                  <Link to='/user/profile/edit' className="edit">
                    <span className="text">Edit Profile</span> <EditIcon className="icon"/>
                  </Link>
                </div>
                <p className="title">Name:</p>
                <p>{this.props.userInfo.firstName} {this.props.userInfo.lastName}</p>
                <p className="title">Email:</p>
                <p>{this.props.userInfo.email}</p>
                {this.props.userInfo.userType === 'non-profit'
                  ? <div className='non-profit-info'>
                    <p className="title">Address:</p>
                    <p>{this.props.userInfo.address}<br />
                      {this.props.userInfo.city},
                      {this.props.userInfo.state}
                      {this.props.userInfo.zip}
                    </p>
                    <p className="title">Employer Identification Number (EIN):</p>
                    <p>{this.props.userInfo.ein}</p>
                  </div>
                  : ''}
                <p>
                  {`Password Changed on ${this.props.userInfo.passwordDate.getMonth() + 1}/${this.props.userInfo.passwordDate.getDate()}/${this.props.userInfo.passwordDate.getFullYear()}`}
                </p>
              </div>
            </section>
          </main>
        );
      }
      return (
        <h1>Loading</h1>
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

export default ViewProfile;
