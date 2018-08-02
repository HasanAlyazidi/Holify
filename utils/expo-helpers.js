import { Asset, Font, Permissions, Notifications } from 'expo';

import { setDeviceToken } from '../actions/settings';

export const cacheImages = images =>
  images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });

export const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

// push notification
export const registerForPushNotificationsAsync = async () => {
  try {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync();

    setDeviceToken(token);
  } catch (e) {
    // handle error
  }
};
