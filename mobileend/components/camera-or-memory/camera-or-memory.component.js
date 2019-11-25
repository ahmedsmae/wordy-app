import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { verifyCameraPermissions } from '../../utils/verify-permissions';

const CamerOrMemory = ({ visible, hideDialog, onImagePick }) => {
  const _handleImageChosen = async fromCamera => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) {
      return;
    }

    const options = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false
    };

    const image = fromCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (!image.cancelled) {
      onImagePick(image);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Camera or Memory</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            Would you like to take new photo or pick one from your memory ?
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'space-around' }}>
          <Button onPress={_handleImageChosen.bind(this, true)}>Camera</Button>
          <Button onPress={_handleImageChosen.bind(this, false)}>Memory</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CamerOrMemory;
