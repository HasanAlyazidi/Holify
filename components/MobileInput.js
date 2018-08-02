import React from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-native-phone-input';

import t from '../i18n';

import { textInputStyle } from '../components/account/TextField';

import countries from '../assets/jsons/countries.json';

export default class MobileInput extends React.PureComponent {
  static propTypes = {
    inputRef: PropTypes.func.isRequired,
  };

  render() {
    const { inputRef, ...props } = this.props;
    return (
      <PhoneInput
        ref={inputRef}
        style={textInputStyle}
        flagStyle={{ borderWidth: 0 }}
        initialCountry="sa"
        cancelText={t('cancel')}
        confirmText={t('confirm')}
        textProps={{ placeholder: t('mobile') }}
        countriesList={countries}
        {...props}
      />
    );
  }
}
