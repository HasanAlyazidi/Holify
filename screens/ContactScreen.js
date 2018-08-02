import React from 'react';
import { StyleSheet } from 'react-native';

import loaderHandler from 'react-native-busy-indicator/LoaderHandler';

import t from '../i18n';
import NavigatorService from '../utils/navigator';

import AccountScreen from '../components/account/AccountScreen';
import TextField from '../components/account/TextField';

import { Api, showAlert, Validate, deviceOS } from '../utils/Common';

export default class ContactScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.name = '';
    this.email = '';
    this.message = '';

    this.pageTitle = t('contact');
  }

  submitButton = async () => {
    const { name, email, message } = this;

    const {
      name: { min: minNameLength, max: maxNameLength },
      message: { min: minMessageLength, max: maxMessageLength },
    } = Validate.lengths;

    const boolNameLength = Validate.between(name, minNameLength, maxNameLength);
    const boolValidEmail = Validate.email(email);
    const boolMessageLength = Validate.between(message, minMessageLength, maxMessageLength);

    // validate inputs
    if (boolNameLength && boolValidEmail && boolMessageLength) {
      // api parameteres
      const params = {
        name,
        email: email.toLowerCase(),
        message,
        deviceOS,
      };

      this.sendContactToServer(params);
    } else {
      let error;

      const {
        emptyField, invalidEmail, invalidLength, unknownError,
      } = Validate.message;

      const nameFieldTitle = t('name');
      const messageFieldTitle = t('message');

      if (Validate.empty(name)) {
        error = emptyField(nameFieldTitle);
      } else if (!boolNameLength) {
        error = invalidLength(nameFieldTitle, minNameLength, maxNameLength);
      } else if (Validate.empty(email)) {
        error = emptyField(t('email'));
      } else if (!boolValidEmail) {
        error = invalidEmail;
      } else if (Validate.empty(message)) {
        error = emptyField(t('message'));
      } else if (!boolMessageLength) {
        error = invalidLength(messageFieldTitle, minMessageLength, maxMessageLength);
      } else {
        error = unknownError;
      }

      showAlert(this.pageTitle, error);
    }
  };

  sendContactToServer = (params) => {
    Api.post('contact', {
      params,
      alertTitle: this.pageTitle,

      onStart: () => {
        loaderHandler.showLoader();
      },

      onSuccess: (json) => {
        const { success } = json;
        const { message, sent } = success;

        showAlert(this.pageTitle, message || Validate.message.unknownError, null, () => {
          if (sent) {
            NavigatorService.reset('Home');
          }
        });
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
        submitButtonTitle={t('sendNow')}
        submitButtonCode={this.submitButton}
        leftButtonTitle={t('about')}
        leftButtonCode={() => NavigatorService.navigate('About')}
      >
        <TextField
          placeholder={t('name')}
          onChangeText={(name) => {
            this.name = name;
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
          multiline
          numberOfLines={4}
          maxLength={350}
          placeholder={t('message')}
          onChangeText={(message) => {
            this.message = message;
          }}
          style={styles.messageTextField}
        />
      </AccountScreen>
    );
  }
}

const styles = StyleSheet.create({
  messageTextField: {
    height: 100,
  },
});
