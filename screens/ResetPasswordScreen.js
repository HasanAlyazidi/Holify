import React from 'react';
import { StyleSheet, Text } from 'react-native';
import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import t from '../i18n';

import NavigatorService from '../utils/navigator';

import AccountScreen from '../components/account/AccountScreen';
import TextField from '../components/account/TextField';

import { Api, showAlert, Validate } from '../utils/Common';

export default class ResetPasswordScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.email = '';

    this.pageTitle = t('resetPassword.title');
  }

  submitButton = async () => {
    const { email } = this;

    const boolValidEmail = Validate.email(email);

    // validate inputs
    if (boolValidEmail) {
      // api parameteres
      const params = {
        email: email.toLowerCase(),
      };

      this.resetPassword(params);
    } else {
      let error;

      const { emptyField, invalidEmail, unknownError } = Validate.message;

      if (Validate.empty(email)) {
        error = emptyField(t('email'));
      } else if (!boolValidEmail) {
        error = invalidEmail;
      } else {
        error = unknownError;
      }

      showAlert(this.pageTitle, error);
    }
  };

  resetPassword = (params) => {
    Api.post('password/email', {
      params,
      alertTitle: this.pageTitle,

      onStart: () => {
        loaderHandler.showLoader();
      },

      onSuccess: (json) => {
        const { message } = json.success;

        if (message) {
          showAlert(this.pageTitle, message, null, () => {
            NavigatorService.reset('Home');
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
        submitButtonTitle={t('resetPassword.submit')}
        submitButtonCode={this.submitButton}
        leftButtonTitle={t('login')}
        leftButtonCode={() => NavigatorService.navigate('Login')}
      >
        <Text style={styles.text}>{t('resetPassword.enterEmail')}</Text>

        <TextField
          placeholder={t('email')}
          keyboardType="email-address"
          onChangeText={(email) => {
            this.email = email;
          }}
        />
      </AccountScreen>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 8,
  },
});
