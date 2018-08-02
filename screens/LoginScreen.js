import React from 'react';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import t from '../i18n';

import NavigatorService from '../utils/navigator';

import { getReturnPage, resetReturnPage } from '../actions/loginRegisterSettings';

import { Api, showAlert, Validate, deviceOS, deviceToken, User } from '../utils/Common';

import AccountScreen from '../components/account/AccountScreen';
import TextField from '../components/account/TextField';

export default class LoginScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.email = '';
    this.password = '';

    this.pageTitle = t('login');
  }

  submitButton = async () => {
    const { email, password } = this;

    const { password: { min: minPasswordLength, max: maxPasswordLength } } = Validate.lengths;

    const boolValidEmail = Validate.email(email);
    const boolPasswordLength = Validate.between(password, minPasswordLength, maxPasswordLength);

    // validate inputs
    if (boolValidEmail && boolPasswordLength) {
      // api parameteres
      const params = {
        email: email.toLowerCase(),
        password,
        deviceOS,
        deviceToken: deviceToken(),
      };

      this.loginUser(params);
    } else {
      let error;

      const {
        emptyField, invalidEmail, invalidPassword, unknownError,
      } = Validate.message;

      if (Validate.empty(email)) {
        error = emptyField(t('email'));
      } else if (!boolValidEmail) {
        error = invalidEmail;
      } else if (Validate.empty(password)) {
        error = emptyField(t('password'));
      } else if (!boolPasswordLength) {
        error = invalidPassword(minPasswordLength, maxPasswordLength);
      } else {
        error = unknownError;
      }

      showAlert(this.pageTitle, error);
    }
  };

  loginUser = (params) => {
    const { email } = params;

    Api.post('login', {
      params,
      alertTitle: this.pageTitle,

      onStart: () => {
        loaderHandler.showLoader();
      },

      onSuccess: async (json) => {
        const { success } = json;
        const { name, mobile, token } = success.user;

        if (token) {
          await User.login(name, email, mobile, token);

          showAlert(this.pageTitle, success.message, null, () => {
            if (getReturnPage()) {
              NavigatorService.resetAndNavigate('Home', null, [{ routeName: getReturnPage() }]);
            } else {
              NavigatorService.reset('Home');
            }

            resetReturnPage();
          });
        }
      },

      onFinish: () => {
        loaderHandler.hideLoader();
      },
    });
  };

  render() {
    return (
      <AccountScreen
        title={this.pageTitle}
        submitButtonTitle={t('account.loginButton')}
        submitButtonCode={this.submitButton}
        leftButtonTitle={t('account.register')}
        leftButtonCode={() => NavigatorService.navigate('Register')}
        centerButtonTitle={t('account.reset')}
        centerButtonCode={() => NavigatorService.navigate('ResetPassword')}
      >
        <TextField
          placeholder={t('email')}
          keyboardType="email-address"
          onChangeText={(email) => {
            this.email = email;
          }}
        />

        <TextField
          secureTextEntry
          placeholder={t('password')}
          onChangeText={(password) => {
            this.password = password;
          }}
        />
      </AccountScreen>
    );
  }
}
