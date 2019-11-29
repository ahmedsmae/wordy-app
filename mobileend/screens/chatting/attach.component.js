import React from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { Surface, Paragraph } from 'react-native-paper';
import attachData from './attach.data';
import * as ImagePicker from 'expo-image-picker';

import {
  verifyCameraPermissions,
  verifyContactsPermission
} from '../../utils/verify-permissions';

const { width, height } = Dimensions.get('window');

const Attach = ({
  onHide,
  onImageFromCamera,
  onImageFromGallery,
  navigateToContacts
}) => {
  const _handleGetImage = async fromCamera => {
    const hasPermission = await verifyCameraPermissions();
    if (!hasPermission) return;

    const options = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false
    };

    onHide();
    const image = fromCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (!image.cancelled) {
      fromCamera ? onImageFromCamera(image) : onImageFromGallery(image);
    }
  };

  const _handleGetContacts = async () => {
    const hasPermission = await verifyContactsPermission();
    if (!hasPermission) return;

    navigateToContacts();
    onHide();
  };

  return (
    <>
      <TouchableOpacity
        onPress={onHide}
        activeOpacity={0}
        style={styles.portal}
      />

      <Surface style={styles.iconsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={_handleGetImage.bind(this, false)}
            activeOpacity={0.8}
            style={styles.iconWrapper}
          >
            <Image source={attachData.gallery.icon} style={styles.icon} />
            <Paragraph style={styles.title}>
              {attachData.gallery.title}
            </Paragraph>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={_handleGetImage.bind(this, true)}
            activeOpacity={0.8}
            style={styles.iconWrapper}
          >
            <Image source={attachData.camera.icon} style={styles.icon} />
            <Paragraph style={styles.title}>
              {attachData.camera.title}
            </Paragraph>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.iconWrapper}
          >
            <Image source={attachData.location.icon} style={styles.icon} />
            <Paragraph style={styles.title}>
              {attachData.location.title}
            </Paragraph>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={_handleGetContacts}
            activeOpacity={0.8}
            style={styles.iconWrapper}
          >
            <Image source={attachData.contact.icon} style={styles.icon} />
            <Paragraph style={styles.title}>
              {attachData.contact.title}
            </Paragraph>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.iconWrapper}
          >
            <Image source={attachData.document.icon} style={styles.icon} />
            <Paragraph style={styles.title}>
              {attachData.document.title}
            </Paragraph>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={0.8}
            style={styles.iconWrapper}
          >
            <Image source={attachData.audio.icon} style={styles.icon} />
            <Paragraph style={styles.title}>{attachData.audio.title}</Paragraph>
          </TouchableOpacity>
        </ScrollView>
      </Surface>
    </>
  );
};

const styles = StyleSheet.create({
  portal: {
    backgroundColor: 'grey',
    opacity: 0,
    position: 'absolute',
    top: -height + 150,
    right: 0,
    left: 0,
    bottom: 200
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    width: width - 20,
    elevation: 1,
    padding: 10,
    borderRadius: 10
  },
  iconWrapper: {
    alignItems: 'center',
    margin: 10
  },
  icon: {
    width: width / 6,
    height: width / 6
  },
  title: {
    fontSize: 13,
    color: 'grey'
  }
});

export default Attach;
