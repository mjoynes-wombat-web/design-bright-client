// IMPORT DEPENDENCIES
import { connect } from 'react-redux';

// IMPORT REDUX ACTIONS
import { login } from '../../../store/actions';

// IMPORT COMPONENT
import LoginForm from './components';

// MAP STATE TO PROPS
// Maps the redux state for userAuth and error to props.
const mapStateToProps = state => ({
  userAuth: state.userAuth,
  error: state.error,
});

// MAP DISPATCH TO PROPS
// Maps the redux action for login to props.
const mapDispatchToProps = dispatch => ({
  onLogin(loginInfo, callback) {
    dispatch(
      login(loginInfo, callback),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
