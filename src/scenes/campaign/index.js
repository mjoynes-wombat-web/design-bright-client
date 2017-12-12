// IMPORT DEPENDENCIES
import { connect } from 'react-redux';

// IMPORT REDUX ACTIONS
import { requireAuth } from '../../store/actions';

// IMPORT COMPONENT
import Campaign from './components';

// Maps Redux state for userAuth and userInfo to component props.
const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userInfo: state.userInfo,
});

// Maps requireAuth action to component props.
const mapDispatchToProps = dispatch => ({
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
