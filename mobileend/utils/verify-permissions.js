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
      'You need to grant camera permissions to use this app.',
      [{ text: 'Okay' }]
    );
    return false;
  }
  return true;
};
