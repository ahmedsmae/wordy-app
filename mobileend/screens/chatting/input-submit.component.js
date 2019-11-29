import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Attach from './attach.component';

const InputSubmit = ({
  text,
  onChangeText,
  onSend,
  onImageFromCamera,
  onImageFromGallery,
  navigateToContacts
}) => {
  const [showAttach, setShowAttach] = useState(false);

  return (
    <View style={styles.container}>
      {showAttach && (
        <Attach
          onHide={() => setShowAttach(false)}
          onImageFromCamera={onImageFromCamera}
          onImageFromGallery={onImageFromGallery}
          navigateToContacts={navigateToContacts}
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
      </View>
      <IconButton
        style={styles.send}
        color="white"
        icon="send"
        size={23}
        onPress={onSend}
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
    backgroundColor: 'white',
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
  attach: {
    position: 'absolute',
    right: -3,
    bottom: 1,
    elevation: 1,
    transform: [{ rotate: '-120deg' }]
  },
  send: {
    backgroundColor: '#0b8f14',
    padding: 4,
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 1,
    marginBottom: 5
  }
});

export default InputSubmit;
