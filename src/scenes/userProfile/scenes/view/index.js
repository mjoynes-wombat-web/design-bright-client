import { connect } from 'react-redux';

import { getUserInfo, requireAuth } from '../../../../store/actions';
import ViewProfile from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  onGetUserInfo(callback) {
    dispatch(
      getUserInfo(callback),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
