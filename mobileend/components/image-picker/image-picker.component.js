import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { FAB } from 'react-native-paper';

import CameraOrMemory from '../camera-or-memory/camera-or-memory.component';

import DefaultUserImage from '../../assets/user.png';

import styles from './image-picker.styles';

const ImgPicker = ({ defaultImage, onImageTaken, style }) => {
  const [pickedImage, setPickedImage] = useState(defaultImage);
  const [showCameraOrMemory, setShowCameraOrMemory] = useState(false);

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.imagePreview}>
        <CameraOrMemory
          visible={showCameraOrMemory}
          hideDialog={() => setShowCameraOrMemory(false)}
          onImagePick={image => {
            setShowCameraOrMemory(false);
            setPickedImage(image.uri);
            onImageTaken(image);
          }}
        />
        {!pickedImage ? (
          <Image style={styles.image} source={DefaultUserImage} />
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <FAB
        style={styles.fab}
        small
        icon="create"
        onPress={() => setShowCameraOrMemory(true)}
      />
    </View>
  );
};

export default ImgPicker;
