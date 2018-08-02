import React from 'react';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import t from '../i18n';
import NavigatorService from '../utils/navigator';

import { getReturnPage, resetReturnPage } from '../actions/loginRegisterSettings';

import { Api, showAlert, Validate, deviceOS, deviceToken, User } from '../utils/Common';

import AccountScreen from '../components/account/AccountScreen';
import MobileInput from '../components/MobileInput';
import TextField from '../components/account/TextField';

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.name = '';
    this.password = '';
    this.email = '';

    this.pageTitle = t('register');
  }

  submitButton = async () => {
    const { name, password, email } = this;

    const mobile = this.mobileInput.getValue();

    const {
      name: { min: minNameLength, max: maxNameLength },
      password: { min: minPasswordLength, max: maxPasswordLength },
    } = Validate.lengths;

    const boolNameLength = Validate.between(name, minNameLength, maxNameLength);
    const boolValidEmail = Validate.email(email);
    const boolPasswordLength = Validate.between(password, minPasswordLength, maxPasswordLength);
    const boolValidMobile = this.mobileInput.isValidNumber();
    const boolValidMobileType = this.mobileInput.getNumberType() === 'MOBILE';

    // validate inputs
    if (
      boolNameLength &&
      boolValidEmail &&
      boolPasswordLength &&
      boolValidMobile &&
      boolValidMobileType
    ) {
      // api parameteres
      const params = {
        name,
        email: email.toLowerCase(),
        password,
        mobile,
        deviceOS,
        deviceToken: deviceToken(),
      };

      this.registerUser(params);
    } else {
      let error;

      const {
        emptyField,
        invalidEmail,
        invalidLength,
        invalidPassword,
        invalidMobileNumber,
        invalidMobileType,
        unknownError,
      } = Validate.message;

      const nameFieldTitle = t('username');
      const mobileFieldTitle = t('mobile');

      if (Validate.empty(name)) {
        error = emptyField(nameFieldTitle);
      } else if (!boolNameLength) {
        error = invalidLength(nameFieldTitle, minNameLength, maxNameLength);
      } else if (Validate.empty(email)) {
        error = emptyField(t('email'));
      } else if (!boolValidEmail) {
        error = invalidEmail;
      } else if (Validate.empty(password)) {
        error = emptyField(t('password'));
      } else if (!boolPasswordLength) {
        error = invalidPassword(minPasswordLength, maxPasswordLength);
      } else if (Validate.empty(mobile)) {
        error = emptyField(mobileFieldTitle);
      } else if (!boolValidMobile) {
        error = invalidMobileNumber;
      } else if (!boolValidMobileType) {
        error = invalidMobileType;
      } else {
        error = unknownError;
      }

      showAlert(this.pageTitle, error);
    }
  };

  registerUser = (params) => {
    const { name, email, mobile } = params;

    Api.post('register', {
      params,
      alertTitle: this.pageTitle,

      onStart: () => {
        loaderHandler.showLoader();
      },

      onSuccess: async (json) => {
        const { success } = json;
        const { token, status } = success.user;

        if (status === 'approved' && token) {
          await User.login(name, email, mobile, token);
        }

        showAlert(this.pageTitle, success.message || Validate.message.unknownError, null, () => {
          if (getReturnPage()) {
            NavigatorService.resetAndNavigate('Home', null, [{ routeName: getReturnPage() }]);
          } else {
            NavigatorService.reset('Home');
          }

          resetReturnPage();
        });
      },

      onFinish: () => {
        loaderHandler.hideLoader();
      },
    });
  };

  mobileInputRef = (ref) => {
    this.mobileInput = ref;
  };

  render() {
    return (
      <AccountScreen
        title={this.pageTitle}
        submitButtonTitle={t('account.registerButton')}
        submitButtonCode={this.submitButton}
        leftButtonTitle={t('login')}
        leftButtonCode={() => NavigatorService.navigate('Login')}
      >
        <TextField
          placeholder={t('username')}
          onChangeText={(username) => {
            this.name = username;
          }}
        />

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

        <MobileInput inputRef={this.mobileInputRef} />
      </AccountScreen>
    );
  }
}
