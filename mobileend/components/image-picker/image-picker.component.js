import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import CameraOrMemory from '../camera-or-memory/camera-or-memory.component';

import blankImage from '../../assets/group.png';

const ImgPicker = ({ defaultImage, onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState(defaultImage);
  const [showCameraOrMemory, setShowCameraOrMemory] = useState(false);

  return (
    <>
      <CameraOrMemory
        visible={showCameraOrMemory}
        hideDialog={() => setShowCameraOrMemory(false)}
        onImagePick={image => {
          setShowCameraOrMemory(false);
          setPickedImage(image.uri);
          onImageTaken(image);
        }}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setShowCameraOrMemory(true)}
      >
        <Image
          source={pickedImage ? { uri: pickedImage } : blankImage}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginRight: 20,
            marginLeft: 10,
            marginTop: 5
          }}
        />
      </TouchableOpacity>
    </>
  );
};

export default ImgPicker;
