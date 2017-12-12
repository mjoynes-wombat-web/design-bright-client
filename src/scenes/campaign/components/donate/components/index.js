/* eslint-env browser */
// IMPORT DEPENDENCIES
import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';

// IMPORT PARTIALS
import { OverlayModal } from '../../../../../partials';

// IMPORT HELPERS
import { validEmail } from '../../../../../helpers';

// IMPORT COMPONENTS
import CampaignHeader from '../../campaignHeader';
import DonationForm from './donationForm';
import DonationConfirmation from './donationConfirmation';

// IMPORT STYLING
import './scss/style.scss';

// Returns the stripe styling based on the window's inner width.
const stripeStyle = () => {
  if (window.innerWidth >= 640) {
    return {
      base: {
        lineHeight: 'normal',
        fontFamily: '"Lato", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '1.5rem',
        color: '#808080',
        '::placeholder': {
          color: '#cccccc',
          fontWeight: '300',
        },
      },
      invalid: {
        color: '#808080',
      },
    };
  }
  return {
    base: {
      lineHeight: '1.5rem',
      fontFamily: '"Lato", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '1.25rem',
      color: '#808080',
      '::placeholder': {
        color: '#cccccc',
        fontWeight: '300',
      },
    },
    invalid: {
      color: '#808080',
    },
  };
};

// DONATION COMPONENT
class DonateComponent extends React.Component {
  // Sets up state and props and binds this to the class methods.
  constructor(props) {
    super(props);

    this.state = {
      inputs: {
        donation: '2000',
        cardHolder: '',
        billingZip: '',
        email: '',
      },
      stripeStyle: {},
      token: null,
      valid: false,
    };

    this.makeDonation = this.makeDonation.bind(this);
    this.onChangeInputs = this.onChangeInputs.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.confirmDonation = this.confirmDonation.bind(this);
    this.editDonation = this.editDonation.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
  }

  // When the component is about to mount set the stripe styling and set it again every time
  // the window resizes.
  componentWillMount() {
    this.setState({
      stripeStyle: stripeStyle(),
    });

    window.onresize = () => this.setState({
      stripeStyle: stripeStyle(),
    });
  }

  // When an input changes change it's state.
  onChangeInputs(e) {
    if ('preventDefault' in e) {
      e.preventDefault();

      const { target } = e;
      const { name } = target;
      let value;

      // If it's the donation input format the input.
      if (name === 'donation') {
        value = target.value.replace(/\.|,|[^0-9.]/g, '');
        if (isNaN(value)) {
          value = '000';
        } else if (value.indexOf(0) === 0 && value.length > 3) {
          value = value.slice(1);
        } else if (value.length === 2) {
          value = `0${value}`;
        } else if (value.length === 1) {
          value = `00${value}`;
        }
      } else {
        value = target.type === 'checkbox' ? target.checked : target.value;
      }

      const inputs = this.state.inputs;
      inputs[name] = value;

      this.setState({ inputs });

      // Delay on validation due to delay from Stripe's validation.
      setTimeout(() => {
        if (this.validate()) {
          return this.setState({
            valid: true,
          });
        }
        return this.setState({
          valid: false,
        });
      }, 100);
    }
    // Delay on validation due to delay from Stripe's validation.
    setTimeout(() => {
      if (this.validate()) {
        return this.setState({
          valid: true,
        });
      }
      return this.setState({
        valid: false,
      });
    }, 100);
  }

  // Runs when the donation form is submitted. Cancels and returns error if it fails.
  // This gets  a token from stripe to be used at confirmation.
  makeDonation(e) {
    e.preventDefault();
    this.props.stripe.createToken({ name: this.state.inputs.cardHolder })
      .then((results) => {
        if ('token' in results) {
          this.setState({ token: results.token });
        } else if ('error' in results) {
          const { error } = results;
          this.props.onNewError(error.message);
          this.cancelDonation();
        }
      });
  }

  // When donation is confirmed send the token from stripe and donation information to the server
  // to be charged. Returns an error or message to the user.
  confirmDonation() {
    const { token, inputs } = this.state;
    axios.post(
      `https://${window.location.hostname}:3000/api/campaigns/donate/${this.props.campaignId}`,
      {
        token,
        amount: inputs.donation,
        description: `Donation to the ${this.props.campaignInfo.name} campaign.`,
        email: inputs.email,
        userInfo: this.props.userInfo,
      },
    )
      .then((chargeResults) => {
        this.props.onNewMessage(chargeResults.data.message);
        this.props.updateCampaignDonations(chargeResults.data.data.donationsMade);
        this.cancelConfirmation();
        window.scroll(0, 0);
      })
      .catch((chargeErr) => {
        this.props.onNewError(chargeErr.response.data.message);
        this.cancelConfirmation();
        window.scroll(0, 0);
      });
  }

  // When the user decides to edit the donation remove the token.
  // This also returns them to the form.
  editDonation() {
    this.setState({ token: null });
  }

  // Validate the inputs.
  validate() {
    const stripeElements = document.getElementsByClassName('StripeElement');
    let stripeValid = true;
    for (let i = 0; i < stripeElements.length; i += 1) {
      const label = stripeElements[i].previousSibling;
      if (stripeElements[i].classList.contains('StripeElement--invalid')) {
        label.classList.add('invalid');
        stripeValid = false;
      } else if (!stripeElements[i].classList.contains('StripeElement--complete')) {
        stripeValid = false;
      } else {
        label.classList.remove('invalid');
      }
    }

    if (
      (validEmail(this.state.inputs.email)
        || this.state.inputs.email.length === 0)
      && parseInt(this.state.inputs.donation, 10) >= 50
      && this.state.inputs.cardHolder.split(' ').length >= 2
      && stripeValid) {
      return true;
    }
    return false;
  }

  // If the user cancels the confirmation clear the token and inputs.
  cancelConfirmation() {
    this.setState({
      token: null,
      inputs: {
        donation: '',
        cardHolder: '',
        billingZip: '',
      },
    },
    this.props.cancelDonation());
  }

  render() {
    return (
      <OverlayModal closeAction={this.state.token
        ? this.cancelConfirmation
        : this.props.cancelDonation}>
        <section className="row align-middle align-center" id="donate">
          <div className="small-12 medium-10 large-8 columns">
            <div className="row">
              <CampaignHeader
                campaignInfo={this.props.campaignInfo}
                isEnded={this.props.isEnded} />
            </div>
            <hr />
          </div>
          {this.state.token
            ? <DonationConfirmation
              inputs={this.state.inputs}
              token={this.state.token}
              confirmDonation={this.confirmDonation}
              editDonation={this.editDonation}
              cancelConfirmation={this.cancelConfirmation} />
            : <DonationForm
              makeDonation={this.makeDonation}
              inputs={this.state.inputs}
              onChangeInputs={this.onChangeInputs}
              stripeStyle={this.state.stripeStyle}
              cancelDonation={this.props.cancelDonation}
              valid={this.state.valid} />}
        </section>
      </OverlayModal>
    );
  }
}

export default injectStripe(DonateComponent);
