import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'react-native-elements';

const LoadingPage = ({ message, icon, backgroundColor }) => (
  <View style={[styles.container, { backgroundColor }]}>
    {icon && <Icon name={icon} size={100} color="#CCC9CD" />}

    <ActivityIndicator size="large" color="gray" />

    {message && <Text style={styles.message}>{message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: 'gray',
    marginTop: 10,
    fontSize: 15,
  },
});

LoadingPage.defaultProps = {
  icon: null,
  message: null,
  backgroundColor: 'white',
};

LoadingPage.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default LoadingPage;
