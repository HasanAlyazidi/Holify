import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import t from '../../i18n';

const dimWidth = Dimensions.get('window').width;

export default class TextField extends React.PureComponent {
  static propTypes = {
    style: PropTypes.number,
  };

  static defaultProps = {
    style: null,
  };

  render() {
    const { style, ...props } = this.props;

    return (
      <TextInput
        {...props}
        placeholderTextColor="#bcbcbc"
        underlineColorAndroid="transparent"
        style={[styles.input, { textAlign: t('style.start') }, style]}
      />
    );
  }
}

export const textInputStyle = {
  width: dimWidth * 0.8,
  height: 45,
  borderWidth: 0.5,
  borderColor: 'lightgray',
  backgroundColor: 'white',
  borderRadius: 7,
  marginBottom: 10,
  paddingRight: 15,
  paddingLeft: 15,
};

const styles = StyleSheet.create({
  input: { color: 'black', ...textInputStyle },
});
