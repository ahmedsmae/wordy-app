import React from 'react';
import { Dialog, TextInput, Button } from 'react-native-paper';

const EditDialog = ({
  title,
  value,
  onChangeText,
  visible,
  onDismiss,
  onSave
}) => {
  return (
    <Dialog
      style={{ marginBottom: 150 }}
      visible={visible}
      onDismiss={onDismiss}
    >
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <TextInput
          style={{ backgroundColor: 'transparent', fontSize: 18, height: 40 }}
          autoFocus
          value={value}
          onChangeText={onChangeText}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSave}>Save</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default EditDialog;
