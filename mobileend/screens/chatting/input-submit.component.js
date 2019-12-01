import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
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
      <IconButton
        style={styles.send}
        color="white"
        icon="send"
        size={23}
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
    flex: 1
  },
  input: {
    fontSize: 17,
    backgroundColor: Colors.LIGHT,
    marginLeft: 5,
    minHeight: 50,
    paddingLeft: 15,
    paddingRight: 45,
    paddingVertical: 5,
    maxHeight: 147,
    marginBottom: 5,
    borderTopLeftRadius: 25,
    lineHeight: 23,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 1
  },
  camera: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    bottom: 3,
    elevation: 1,
    padding: 4
  },
  attach: {
    position: 'absolute',
    right: 40,
    bottom: 3,
    width: 40,
    height: 40,
    elevation: 1,
    transform: [{ rotate: '-120deg' }]
  },
  send: {
    backgroundColor: Colors.ACCENT,
    padding: 4,
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 1,
    marginBottom: 5
  }
});

export default InputSubmit;
