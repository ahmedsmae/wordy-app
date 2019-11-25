import React from 'react';
import { Portal, Card, Dialog } from 'react-native-paper';

const ImagePreview = ({ visible, onDismiss, source }) => {
  return (
    <Portal>
      <Dialog
        style={{ maxHeight: 400 }}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Card.Cover
          style={{ borderRadius: 5, height: '100%', maxHeight: 400 }}
          source={{ uri: source }}
        />
      </Dialog>
    </Portal>
  );
};

export default ImagePreview;
