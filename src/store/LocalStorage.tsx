import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.warn('Async Storage Store Failed', e);
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn('Async Storage Get Failed', e);
  }
};

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('Async Storage Remove Failed', e);
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.warn('Async Storage Clear Failed', e);
  }
};

export const StorageKey = Object.freeze({
  TOKEN: 'Token',
  USER: 'User',
  LANGUAGE: 'LANGUAGE',

  SELECTED_WALLET: 'SELECTED_WALLET',
});
