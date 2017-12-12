import { connect } from 'react-redux';

import { requireAuth } from '../../../../store/actions';
import Login from './components';

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  userAuth: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
