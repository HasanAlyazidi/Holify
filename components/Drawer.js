import React from 'react';
import { StyleSheet, View, Text, ScrollView, Linking } from 'react-native';
import PropTypes from 'prop-types';

import { SocialIcon } from 'react-native-elements';

import { connect } from 'react-redux';

import t, { textAlign } from '../i18n';

import NavigatorService from '../utils/navigator';

import { User, confirmationAlert } from '../utils/Common';

import Logo from '../components/Logo';
import List from '../components/List';

const bgColor = '#F0EFEB';

class Drawer extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      isLoggedIn: PropTypes.bool.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.textAlign = textAlign();
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.user.isLoggedIn !== this.props.user.isLoggedIn ||
      nextProps.user.name !== this.props.user.name
    );
  }

  createDrawerItems() {
    this.accountListWhenLoggedOut = [
      {
        title: t('login'),
        icon: { name: 'account-circle' },
        onPress: () => NavigatorService.navigate('Login'),
      },
      {
        title: t('register'),
        icon: { name: 'person-add' },
        onPress: () => NavigatorService.navigate('Register'),
      },
    ];

    this.accountListWhenLoggedIn = [
      {
        title: t('purchases.title'),
        icon: { name: 'loyalty' },
        onPress: () => NavigatorService.navigate('Purchases'),
      },
      {
        title: t('myAccount.title'),
        icon: { name: 'account-circle' },
        onPress: () => NavigatorService.navigate('MyAccount'),
      },
      {
        title: t('logout'),
        icon: { name: 'exit-to-app' },
        onPress: () => {
          confirmationAlert(t('app.name'), t('confirmLogout'), () => {
            User.logout();
          });
        },
      },
    ];

    this.generalList = [
      {
        title: t('about'),
        icon: { name: 'info-outline' },
        onPress: () => NavigatorService.navigate('About'),
      },
      {
        title: t('contact'),
        icon: { name: 'local-phone' },
        onPress: () => NavigatorService.navigate('Contact'),
      },
      {
        title: t('settings'),
        icon: { name: 'settings' },
        onPress: () => NavigatorService.navigate('Welcome'),
      },
    ];
  }

  gotoInstagramPage = () => {
    Linking.openURL('https://www.instagram.com/');
  }

  render() {
    this.createDrawerItems();

    // name does not change after editing my account
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo />
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.welcomeText, { textAlign: this.textAlign }]}>
            {this.props.user.name || t('welcomeMessage')}
          </Text>

          <List
            items={User.isLoggedIn() ? this.accountListWhenLoggedIn : this.accountListWhenLoggedOut}
          />

          <List items={this.generalList} />

          <View style={styles.socialIcons}>
            <SocialIcon
              light
              button
              raised={false}
              title={t('social.instagram')}
              type="instagram"
              onPress={this.gotoInstagramPage}
              style={styles.instagramIcon}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  welcomeText: {
    paddingHorizontal: 15,
  },

  // header
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: 'white',
    borderBottomColor: '#fada90',
    borderBottomWidth: 3,
  },

  socialIcons: {
    marginTop: 30,
  },
  instagramIcon: {
    backgroundColor: bgColor,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Drawer);
