import { Platform, Alert } from 'react-native';

import t from '../i18n';

import ApiClass from './Api';
import StorageClass from './Storage';
import UserClass from './User';
import ValidateClass from './Validate';

import { getDeviceToken } from '../actions/settings';

export async function isFirstLaunch() {
  const value = await Storage.get('isFirstLaunch');
  return value === '';
}

// One-button alert
export function showAlert(title, text, buttonTitle, onPress = () => {}) {
  Alert.alert(title, text, [{ text: buttonTitle || t('ok'), onPress, style: 'cancel' }], {
    cancelable: false,
  });
}

// Confirmation alert with custom buttons and dismiss button
export function confirmationAlert(
  title,
  text,
  positiveButtonOnPress,
  positiveButtonTitle,
  negativeButtonTitle,
  negativeButtonOnPress = () => {},
) {
  Alert.alert(
    title,
    text,
    [
      { text: positiveButtonTitle || t('yes'), onPress: positiveButtonOnPress, style: 'cancel' },
      { text: negativeButtonTitle || t('cancel'), onPress: negativeButtonOnPress, style: 'cancel' },
    ],
    {
      cancelable: false,
    },
  );
}

export const Fonts = {
  normal: {
    name: 'DefaultCustomFont-Normal',
    file: require('../assets/fonts/CoconNextArabicLight.ttf'),
  },
};

export const Api = ApiClass;
export const Storage = StorageClass;
export const User = UserClass;
export const Validate = ValidateClass;

export const deviceOS = Platform.OS;
export const deviceToken = () => getDeviceToken();
