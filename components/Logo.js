import React from 'react';
import { StyleSheet, Image } from 'react-native';

const Logo = () => (
  <Image
    style={styles.logo}
    source={require('../assets/images/screens/Main/logo.png')}
    fadeDuration={0}
  />
);

const styles = StyleSheet.create({
  logo: {
    height: 152,
    width: 100,
  },
});

export default Logo;
