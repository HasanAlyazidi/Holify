import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';

import NavigatorService from '../utils/navigator';

import t from '../i18n';

class MainScreen extends React.PureComponent {
  static navigationOptions = {
    title: null,
    header: null,
    headerBackTitle: null,
    drawerLockMode: 'unlocked',
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.content}
          source={require('../assets/images/screens/Main/app1.png')}
          fadeDuration={0}>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => NavigatorService.openDrawer()}>
              <Image
                style={styles.headerButtons}
                source={t('images.menu')} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.contents}>
            <View style={styles.pointsView}>
              <Text style={styles.pointsTitle}>{t('myPoints')}</Text>
              <Text style={styles.points}>{this.props.points.points}</Text>
            </View>

            <TouchableOpacity onPress={() => NavigatorService.navigate('Scan')}>
              <ImageBackground
                style={styles.scanButton}
                source={require('../assets/images/screens/Main/scan-button.png')}>
                <Text style={styles.scanButtonText}>{t('scan')}</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  // header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headerButtons: {
    width: 40,
    height: 40,
  },

  content: {
    flex: 1,
    width: null,
    height: null,
  },
  contents: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },

  pointsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsTitle: {
    color: '#295019',
    fontSize: 15,
    paddingHorizontal: 5,
    backgroundColor: '#8FD460'
  },
  points: {
    color: '#8FD460',
    fontSize: 35,
    fontFamily: 'normal'
  },

  scanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
  },

  scanButtonText: {
    color: 'white',
    fontSize: 25,
  }
});

const mapStateToProps = state => ({
  points: state.points,
});

export default connect(mapStateToProps)(MainScreen);
