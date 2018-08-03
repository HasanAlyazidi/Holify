import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Permissions, BarCodeScanner, DangerZone } from 'expo';

import NavigatorService from '../utils/navigator';

import t from '../i18n';
import ErrorPage from '../components/ErrorPage';

import animation from '../assets/animations/check_animation.json';

const { Lottie } = DangerZone;

const animationSize = 300;

export default class ScanScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    hasCameraPermission: null,
    hasCodeScanned: false,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeRead = ({ type, data }) => {
    this.setState({ hasCodeScanned: true }, () => {
      this._playAnimation();
    });

    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this.animation.play();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  render() {
    const { hasCameraPermission, hasCodeScanned } = this.state;

    if (hasCameraPermission === null) {
      return <ErrorPage icon="photo-camera" message={t('permissions.camera.allowed')} />
    } else if (hasCameraPermission === false) {
      return <ErrorPage
                icon="photo-camera"
                message={t('permissions.camera.denied')}
                showButton
                buttonTitle={t('back')}
                onPress={() => NavigatorService.goBack()} />
    } else if (hasCodeScanned) {
      return (
        <View style={styles.animationContainer}>
          <View style={{ width: animationSize, height: animationSize }}>
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{ width: animationSize, height: animationSize }}
              source={animation}
              loop={false}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={t('back')}
              color="black"
              onPress={() => NavigatorService.goBack()}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this.handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
