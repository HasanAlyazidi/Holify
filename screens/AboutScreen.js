import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo';

import t from '../i18n';

import Logo from '../components/Logo';
import List from '../components/List';

const AboutScreen = () => {
  const team = [
    {
      title: t('aboutPage.owner.name'),
      subtitle: t('aboutPage.owner.subtitle'),
      icon: { name: 'person' },
      onPress: () => {},
    },
    {
      title: t('aboutPage.developer.name'),
      subtitle: t('aboutPage.developer.subtitle'),
      icon: { name: 'person' },
      onPress: () => {},
    },
    {
      title: t('aboutPage.designer.name'),
      subtitle: t('aboutPage.designer.subtitle'),
      icon: { name: 'person' },
      onPress: () => {},
    },
  ];

  return (
    <LinearGradient colors={['white', '#F0EFEB']} style={styles.container}>
      <View style={styles.appDetails}>
        <Logo />
        <Text style={{ padding: 20, color: 'darkgray' }}>{t('app.description')}</Text>
      </View>

      <List items={team} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#fada90',
  },
  appDetails: {
    marginTop: 35,
    alignItems: 'center',
  },
});

export default AboutScreen;
