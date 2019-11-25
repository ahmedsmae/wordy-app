import axios from 'axios';
import { AsyncStorage } from 'react-native';

export default setAuthToken = async () => {
  const basicToken = await AsyncStorage.getItem('BASIC_TOKEN');
  const fbToken = await AsyncStorage.getItem('FACEBOOK_TOKEN');
  const googleToken = await AsyncStorage.getItem('GOOGLE_TOKEN');

  if (basicToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${basicToken}`;
  } else if (fbToken) {
    axios.defaults.headers.common['Authorization'] = `Facebook ${fbToken}`;
  } else if (googleToken) {
    axios.defaults.headers.common['Authorization'] = `Google ${googleToken}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
