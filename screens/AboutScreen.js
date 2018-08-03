import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo';

import t from '../i18n';

import Logo from '../components/Logo';

const AboutScreen = () => {
  return (
    <LinearGradient colors={['white', '#F0EFEB']} style={styles.container}>
      <Logo />
      <Text style={[styles.text, { marginTop: 10 }]}>{t('app.description')}</Text>
      <Text style={styles.text}>v0.1.3</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appDetails: {
    alignItems: 'center',
  },
  text: {
    color: 'darkgray',
    marginBottom: 6,
  }
});

export default AboutScreen;
