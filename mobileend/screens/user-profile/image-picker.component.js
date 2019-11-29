import React, { useState } from 'react';
import { Image, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { CameraOrMemory } from '../../components';

import { getUserImageSource } from '../../utils/helper-functions';

const { width } = Dimensions.get('window');

const ImgPicker = ({ onImageTaken, currentUser, randomDate }) => {
  const [showCameraOrMemory, setShowCameraOrMemory] = useState(false);

  return (
    <>
      <CameraOrMemory
        visible={showCameraOrMemory}
        hideDialog={() => setShowCameraOrMemory(false)}
        onImagePick={image => {
          setShowCameraOrMemory(false);
          onImageTaken(image);
        }}
      />
      <View style={{ alignItems: 'center' }}>
        <Image
          style={{ width: 150, height: 150, borderRadius: 75, margin: 20 }}
          source={getUserImageSource(currentUser, randomDate)}
        />

        <IconButton
          size={25}
          icon="camera"
          color="white"
          style={{
            width: 45,
            height: 45,
            borderRadius: 23,
            backgroundColor: 'tomato',
            padding: 10,
            position: 'absolute',
            bottom: 20,
            right: width / 2 - 85,
            elevation: 3
          }}
          onPress={() => setShowCameraOrMemory(true)}
        />
      </View>
    </>
  );
};

export default ImgPicker;
