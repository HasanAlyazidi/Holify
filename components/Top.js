import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Logo from '../components/Logo';

const Top = (props) => {
  const { title } = props;

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 22,
    marginTop: 10,
  },
});

Top.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Top;
