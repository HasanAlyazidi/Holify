import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Icon, Button } from 'react-native-elements';

import t from '../i18n';

const ErrorPage = ({
  hideIcon,
  icon,
  message,
  showButton,
  buttonTitle,
  onPress,
  backgroundColor,
}) => (
  <View style={[styles.container, { backgroundColor }]}>
    {!hideIcon && <Icon name={icon} size={100} color="#CCC9CD" />}
    <Text style={styles.text}>{message}</Text>
    {showButton && (
      <Button
        title={buttonTitle || t('errors.failedApi.tryAgain')}
        backgroundColor="#EBC061"
        buttonStyle={styles.button}
        onPress={onPress}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'gray',
    marginTop: 5,
    fontSize: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
});

ErrorPage.defaultProps = {
  hideIcon: false,
  icon: 'warning',
  showButton: false,
  buttonTitle: null,
  backgroundColor: '#F3F3F3',
  onPress: null,
};

ErrorPage.propTypes = {
  message: PropTypes.string.isRequired,
  hideIcon: PropTypes.bool,
  icon: PropTypes.string,
  showButton: PropTypes.bool,
  buttonTitle: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
};

export default ErrorPage;
