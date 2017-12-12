/* eslint-env browser */
// IMPORT DEPENDENCIES
import auth0 from 'auth0-js';
import axios from 'axios';

// IMPORT REDUX CONSTANTS
import C from '../constants';

// NEW ERROR ACTION
// Dispatch new error to store.
export const newError = (errType, errMsg) => (dispatch) => {
  dispatch({
    type: C.ERROR,
    payload: {
      type: errType,
      message: errMsg,
    },
  });
};

// NEW MESSAGE
// Dispatch new message to store.
export const newMessage = (msgType, msg) => (dispatch) => {
  dispatch({
    type: C.MESSAGE,
    payload: {
      type: msgType,
      message: msg,
    },
  });
};

// LOGOUT
// Removes user auth and user info from store to logout.
export const logout = () => (dispatch) => {
  dispatch({
    type: C.USER_AUTH,
    payload: {},
  });
  dispatch({
    type: C.USER,
    payload: {},
  });
};

// REQUIRE AUTHORIZATION
// Check to confirm that authorization is a valid key and is still valid. 
export const requireAuth = () => (dispatch, getState) => {
  const currentState = getState();
  const { userAuth } = currentState;
  const authDate = new Date(Date.parse(userAuth.date));
  const expireDate = new Date(authDate.setSeconds(
    authDate.getSeconds() + userAuth.expiresIn,
  ));
  const currentDate = new Date();
  if (Object.keys(userAuth).length > 0) {
    if (userAuth.accessToken) {
      if (expireDate > currentDate) {
        return true;
      }
      // dispatch(logout());
      return false;
    }
    // dispatch(logout());
    return false;
  }
  return false;
};

// GET THE USER INFORMATION
// Gets the user information from Auth0 and dispatches it to the store.
export const getUserInfo = () =>
  (dispatch, getState) => {
    console.log('This ran');
    const currentState = getState();
    if (dispatch(requireAuth())) {
      const webAuth = new auth0.WebAuth({
        domain: 'designbright.auth0.com',
        clientID: 'bBvDRGSmgiYZk2GRZ3Va5hGeuNKwQ3Rh',
      });

      webAuth.client.userInfo(
        currentState.userAuth.accessToken,
        (err, userData) => {
          if (err) {
            if (err.code === 401) {
              dispatch(logout());
              return;
            }
          }
          const userInfo = {
            email: userData.email,
            firstName: userData.user_metadata.firstName,
            lastName: userData.user_metadata.lastName,
            passwordDate: new Date(Date.parse(userData.user_metadata.passwordDate)),
            userType: userData.app_metadata.userType,
          };
          if ('picture' in userData.user_metadata) {
            userInfo.picture = userData.user_metadata.picture;
          } else {
            userInfo.picture = '/assets/img/user.svg';
          }

          if (userInfo.userType === 'non-profit') {
            axios.get(`https://${window.location.hostname}:3000/api/nonprofits/${currentState.userAuth.accessToken}`)
              .then(({ data }) => {
                const nonprofit = data.data;
                userInfo.nonProfitName = nonprofit.name;
                userInfo.ein = nonprofit.ein;
                userInfo.address = nonprofit.address;
                userInfo.city = nonprofit.city;
                userInfo.state = nonprofit.state;
                userInfo.zip = nonprofit.zip;

                dispatch({
                  type: C.USER,
                  payload: userInfo,
                });
              })
              .catch(error => (
                error.response.data.statusCode === 401
                  ? dispatch(logout())
                  : dispatch(newError(error.response.data.message))
              ));
          } else {
            dispatch({
              type: C.USER,
              payload: userInfo,
            });
          }
        },
      );
    }
  };

// LOGIN
// Uses the email and password to get an access token from Auth0. 
export const login = (loginInfo, callback) => (dispatch) => {
  const webAuth = new auth0.WebAuth({
    domain: 'designbright.auth0.com',
    clientID: 'bBvDRGSmgiYZk2GRZ3Va5hGeuNKwQ3Rh',
  });

  webAuth.client.login({
    realm: 'Username-Password-Authentication',
    username: loginInfo.email,
    password: loginInfo.password,
    scope: 'user_metadata',
  }, (errMsg, authResults) => {
    if (errMsg) {
      return dispatch(newError('login', errMsg.description), callback());
    }

    const authorization = authResults;
    authorization.date = new Date();
    return dispatch(
      {
        type: C.USER_AUTH,
        payload: authorization,
      },
      getUserInfo(),
      callback(),
    );
  });
};
