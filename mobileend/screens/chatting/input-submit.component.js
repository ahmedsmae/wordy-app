import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const InputSubmit = ({ text, onChangeText, onSend }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
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
        style={styles.button}
        color="white"
        icon="send"
        size={23}
        onPress={onSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0
  },
  input: {
    fontSize: 17,
    backgroundColor: 'white',
    marginLeft: 5,
    flex: 1,
    minHeight: 50,
    paddingHorizontal: 15,
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
  button: {
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
