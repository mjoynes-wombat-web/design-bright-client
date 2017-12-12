// IMPORT DEPENDENCIES
import { connect } from 'react-redux';

// IMPORT ACTIONS
import { logout, requireAuth } from '../../../../../store/actions';

// IMPORT COMPONENTS
import UserMenu from './component';

// MAP REDUX STATE TO PROPS
// Map the userAuth and userInfo Redux state to the component props.
const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userInfo: state.userInfo,
});

// MAP REDUX DISPATCH ACTIONS TO PROPS
// Map the logout and require auth Redux store action to the component props.
const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(
      logout(),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
