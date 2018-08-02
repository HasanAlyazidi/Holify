import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';

import { Icon } from 'react-native-elements';

import NavigatorService from '../utils/navigator';

export default class MainScreen extends React.PureComponent {
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
            <Icon
              name="menu"
              color="#bfbfbf"
              underlayColor="transparent"
              size={32}
              containerStyle={styles.headerButtons}
              onPress={() => NavigatorService.openDrawer()}
            />
          </View>
          
          <View>
            <Text>Hi</Text>

            <TouchableHighlight onPress={this._onPressButton}>
              <Image
                style={styles.scanButton}
                source={require('../assets/images/screens/Main/scan-button.png')}>
                <Text>Scan</Text>
              </Image>
            </TouchableHighlight>

          </View>

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  headerButtons: {
    width: 55,
    height: 55,
  },

  content: {
    flex: 1,
    width: null,
    height: null,
  },

  scanButton: {
    width: 70,
    height: 70,
  }
});
