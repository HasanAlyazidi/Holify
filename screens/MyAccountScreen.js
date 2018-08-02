import React from 'react';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';
import PhoneInput from 'react-native-phone-input';

import t from '../i18n';

import AccountScreen from '../components/account/AccountScreen';
import TextField, { textInputStyle } from '../components/account/TextField';

import { Api, showAlert, Validate, deviceOS, deviceToken, User } from '../utils/Common';

import countries from '../assets/jsons/countries.json';

export default class MyAccountScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.name = User.userName;
    this.password = '';
    this.email = User.email;

    this.pageTitle = t('myAccount.title');
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
        password,
        mobile,
        deviceOS,
        deviceToken: deviceToken(),
      };

      this.saveData(params);
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

  saveData = (params) => {
    const { name, mobile } = params;

    Api.patch(
      'user',
      {
        params,
        alertTitle: this.pageTitle,
        auth: true,

        onStart: () => {
          loaderHandler.showLoader();
        },

        onSuccess: async (json) => {
          const { success } = json;
          const { status } = success.user;

          if (status === 'active') {
            await User.login(name, User.email, mobile, User.token);
          }

          showAlert(this.pageTitle, success.message || Validate.message.unknownError);
        },

        onFinish: () => {
          loaderHandler.hideLoader();
        },
      },
      true,
    );
  };

  render() {
    return (
      <AccountScreen
        title={this.pageTitle}
        submitButtonTitle={t('myAccount.submit')}
        submitButtonCode={this.submitButton}
      >
        <TextField
          defaultValue={this.name}
          placeholder={t('username')}
          onChangeText={(username) => {
            this.name = username;
          }}
        />

        <TextField
          editable={false}
          value={this.email}
          placeholder={t('email')}
          keyboardType="email-address"
        />

        <TextField
          secureTextEntry
          placeholder={t('password')}
          onChangeText={(password) => {
            this.password = password;
          }}
        />

        <PhoneInput
          ref={(ref) => {
            this.mobileInput = ref;
          }}
          style={textInputStyle}
          value={User.mobile}
          flagStyle={{ borderWidth: 0 }}
          cancelText={t('cancel')}
          confirmText={t('confirm')}
          textProps={{ placeholder: t('mobile') }}
          countriesList={countries}
        />
      </AccountScreen>
    );
  }
}
