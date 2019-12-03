import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  View,
  BackHandler
} from 'react-native';
import { Appbar, Caption, IconButton, Paragraph } from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';

import { APP_URLS } from '../../redux/utils/urls';

const { width } = Dimensions.get('window');

const SharedImages = ({ navigation }) => {
  const imageMessages = navigation.getParam('messages');
  const opponents = navigation.getParam('opponents');

  const [currentIndex, setCurrentIndex] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const images = imageMessages.map(
    ({ attachment: { file_name }, createdAt, owner }) => {
      return {
        url: APP_URLS.SERVE_MESSAGE_IMAGE(file_name),
        owner: opponents.find(({ _id }) => _id === owner).name,
        date: createdAt
      };
    }
  );

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', function() {
  //     if (showPreview) {
  //       setShowPreview(false);
  //       return true;
  //     }
  //   });
  // }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Shared Images" />
      </Appbar.Header>

      <Modal visible={showPreview} transparent={true}>
        <ImageViewer
          imageUrls={images}
          index={currentIndex}
          renderFooter={cIndex => (
            <View
              style={{
                height: 50,
                width,
                padding: 10,
                flexDirection: 'row',
                backgroundColor: 'rgba(0,0,0,.3)',
                alignItems: 'center'
              }}
            >
              <Caption style={{ color: 'white' }}>From </Caption>
              <Paragraph
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                  flex: 1
                }}
              >
                {images[cIndex].owner}
              </Paragraph>

              <Caption style={{ color: 'white' }}>date </Caption>
              <Paragraph style={{ color: 'white', fontSize: 14 }}>
                {moment(images[cIndex].date).calendar(null, {
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
                  sameElse: 'DD/MM/YYYY'
                })}
              </Paragraph>
              <IconButton
                icon="close"
                color="white"
                size={30}
                onPress={() => setShowPreview(false)}
              />
            </View>
          )}
        />
      </Modal>

      <FlatList
        style={{ flex: 1 }}
        data={imageMessages}
        numColumns={4}
        keyExtractor={({ _id }) => String(_id)}
        renderItem={({
          item: {
            attachment: { file_name },
            createdAt
          },
          index
        }) => (
          <TouchableOpacity
            style={{
              width: width / 4,
              height: width / 4,
              padding: 2
            }}
            activeOpacity={0.8}
            onPress={() => {
              setCurrentIndex(index);
              setShowPreview(true);
            }}
          >
            <Image
              style={{ flex: 1 }}
              source={{
                uri: APP_URLS.SERVE_MESSAGE_IMAGE(file_name)
              }}
            />
            <Caption
              style={{
                position: 'absolute',
                bottom: 0,
                right: 2,
                left: 2,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)',
                textAlign: 'center'
              }}
            >
              {moment(createdAt).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'DD/MM/YYYY'
              })}
            </Caption>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default SharedImages;
