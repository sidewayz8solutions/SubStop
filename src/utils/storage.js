import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@substop_data';

export const loadSubscriptions = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load subs', error);
    return [];
  }
};

export const saveSubscriptions = async (subs) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  } catch (error) {
    console.error('Failed to save subs', error);
  }
};
