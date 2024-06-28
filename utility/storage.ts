import AsyncStorage from '@react-native-async-storage/async-storage';

interface IStorageItem<T> {
  value: T;
}

export enum STORAGE_KEYS {
  userData = 'userData',
  token = 'token',
}

export const Storage = {
  setItem: (key: STORAGE_KEYS, value: any) => {
    if (!key) {
      throw new Error('Key not exists');
    }
    const saveValue = {
      value,
    };
    return AsyncStorage.setItem(key, JSON.stringify(saveValue));
  },

  getItem: async <T>(key: STORAGE_KEYS, defaultValue?: T) => {
    if (!key) {
      throw new Error('Key not exists');
    }
    let savedString = await AsyncStorage.getItem(key)!;
    if (savedString) {
      const savedValue = JSON.parse(savedString) as IStorageItem<T>;
      return savedValue.value || defaultValue;
    }
    return defaultValue;
  },

  clear: (key: STORAGE_KEYS) => {
    AsyncStorage.removeItem(key);
  },

  clearAll: () => {
    const keys = Object.keys(STORAGE_KEYS);
    for (const element of keys) {
      AsyncStorage.removeItem(element);
    }
  },
};
