import React from 'react';
import { StyleSheet, Image } from 'react-native';

const Logo = () => (
  <Image
    style={styles.logo}
    source={require('../assets/images/screens/Main/header-logo.png')}
    fadeDuration={0}
  />
);

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 102,
  },
});

export default Logo;
