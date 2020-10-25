import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import Attach from './attach.component';
import * as ImagePicker from 'expo-image-picker';

import { verifyCameraPermissions } from '../../utils/verify-permissions';

import Colors from '../../utils/colors';

const InputSubmit = ({
  text,
  onChangeText,
  onSendText,
  onImageFromCamera,
  onImageFromGallery,
  navigateToContacts,
  onGetLocation
}) => {
  const [showAttach, setShowAttach] = useState(false);

  const _handleGetImage = async () => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) return;

    const options = {
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false
    };

    const image = await ImagePicker.launchCameraAsync(options);

    if (!image.cancelled) {
      onImageFromCamera(image);
    }
  };

  return (
    <View style={styles.container}>
      {showAttach && (
        <Attach
          onHide={() => setShowAttach(false)}
          onImageFromCamera={onImageFromCamera}
          onImageFromGallery={onImageFromGallery}
          navigateToContacts={navigateToContacts}
          onGetLocation={onGetLocation}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => showAttach && setShowAttach(false)}
          style={styles.input}
          multiline
          placeholderTextColor="lightgrey"
          underlineColor="transparent"
          underlineColorAndroid="transparent"
          value={text}
          onChangeText={onChangeText}
          placeholder="Type a message..."
        />

        <IconButton
          style={styles.attach}
          color="grey"
          icon="attachment"
          size={30}
          onPress={() => setShowAttach(prev => !prev)}
        />

        <IconButton
          style={styles.camera}
          color="grey"
          icon="camera"
          size={25}
          onPress={_handleGetImage}
        />
      </View>

      <FAB
        small
        style={styles.send}
        icon="send"
        color="white"
        onPress={onSendText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.LIGHT,
    borderRadius: 25,
    maxHeight: 145,
    margin: 2,
    marginLeft: 5,
    marginBottom: 5,
    elevation: 1
  },
  input: {
    flex: 1,
    fontSize: 17,
    backgroundColor: Colors.LIGHT,
    marginLeft: 5,
    paddingLeft: 15,
    paddingVertical: 5,
    lineHeight: 22,
    marginVertical: 5
  },
  camera: {
    width: 40,
    height: 40,
    padding: 4,
    margin: 5
  },
  attach: {
    width: 40,
    height: 40,
    // transform: [{ rotate: '-120deg' }], //! reason why it doesn't appear on other phones
    margin: 5
  },
  send: {
    backgroundColor: Colors.ACCENT,
    padding: 5,
    width: 50,
    height: 50,
    elevation: 1,
    margin: 2,
    marginRight: 5,
    marginBottom: 5
  }
});

export default InputSubmit;
