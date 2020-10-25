import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

export const verifyCameraPermissions = async () => {
  const result = await Permissions.askAsync(
    Permissions.CAMERA_ROLL,
    Permissions.CAMERA
  );
  if (result.status !== 'granted') {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant camera permissions to use this feature.',
      [{ text: 'Okay' }]
    );
    return false;
  }
  return true;
};

export const verifyContactsPermission = async () => {
  const result = await Permissions.askAsync(Permissions.CONTACTS);
  if (result.status !== 'granted') {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant read contacts permission to use this feature.',
      [{ text: 'Okay' }]
    );
    return false;
  }
  return true;
};

export const verifyLocationPermission = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  if (result.status !== 'granted') {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant access location permission to use this feature.',
      [{ text: 'Okay' }]
    );
    return false;
  }
  return true;
};

export const verifyPushNotificationsPermission = async () => {
  const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (result.status !== 'granted') {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant push notifications permission to use this feature.',
      [{ text: 'Okay' }]
    );
    return false;
  }
  return true;
};
