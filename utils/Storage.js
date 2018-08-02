import { AsyncStorage } from 'react-native';

// AsyncStorage
export default class Storage {
  static async set(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : '';
    } catch (error) {
      return '';
    }
  }

  static async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      // catch error
    }
  }

  static async multiSet(values) {
    try {
      await AsyncStorage.multiSet(values);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async multiGet(keys) {
    try {
      const values = await AsyncStorage.multiGet(keys);
      return values !== null ? values : '';
    } catch (error) {
      return '';
    }
  }

  static async multiRemove(keys) {
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (error) {
      return false;
    }
  }
}
