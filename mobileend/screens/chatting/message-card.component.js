import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  View,
  Dimensions,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  Clipboard,
  ToastAndroid
} from 'react-native';
import { Paragraph, IconButton, Surface } from 'react-native-paper';

import { APP_URLS } from '../../redux/utils/urls';
import Colors from '../../utils/colors';
const { width } = Dimensions.get('window');

const MessageCard = ({
  message: {
    _id,
    text,
    type,
    has_attachment,
    attachment,
    owner,
    createdAt,
    seen,
    recieved
  },
  userId,
  index,
  messages,
  opponents,
  group,
  previewImage
}) => {
  const mySms = owner === userId;
  const sameUser = index > 0 && owner === messages[index - 1].owner;
  const lastSms = index === messages.length - 1;
  const ownerObject = opponents.find(({ _id }) => _id === owner);
  const smsOwnerName = ownerObject ? ownerObject.name : 'User Left'; //user has left the chat
  const prevSms = index > 0 && messages[index - 1];
  const sameDate =
    moment(createdAt).format('LL') === moment(prevSms.createdAt).format('LL');

  const GOOGLE_API_KEY = 'AIzaSyAfmwc7pFxDsiBhJLomE0aZV4oDPeCShY8';

  let locationThumbnail;
  if (attachment && attachment.location) {
    const { lat, lng } = attachment.location;
    locationThumbnail = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=200x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  }

  const [address, setAddress] = useState('');

  // useEffect(() => {
  //   const getAddress = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${attachment.location.lat},${attachment.location.lng}&key=${GOOGLE_API_KEY}`
  //       );

  //       if (!response.ok) return Error('Something went wrong!');
  //       const resData = await response.json();
  //       if (!resData.results) return Error('Something went wrong!');
  //       setAddress(resData.results[0].formatted_address);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (type === 'LOCATION') getAddress();
  // }, []);

  const _handleOpenGps = () => {
    const { lat, lng } = attachment.location;
    Linking.openURL(`${Platform.OS === 'ios' ? 'maps' : 'geo'}:${lat},${lng}`);
  };

  return (
    <>
      {!sameDate && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 5,
            backgroundColor: 'transparent'
          }}
        >
          <Paragraph
            style={{
              fontSize: 14,
              backgroundColor: '#dbfaff',
              color: '#5e5e5e',
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 5,
              elevation: 1
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
          </Paragraph>
        </View>
      )}

      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          margin: 1,
          marginHorizontal: 10,
          marginTop: sameUser ? 1 : 10,
          marginBottom: lastSms ? 5 : null
        }}
      >
        <Surface
          style={{
            marginLeft: mySms ? 'auto' : null,
            backgroundColor: mySms ? Colors.FADE_PRIMARY : Colors.LIGHT,
            paddingHorizontal: type === 'LOCATION' ? 5 : 10,
            paddingVertical: 4,
            borderTopLeftRadius: !sameUser && !mySms ? 0 : 7,
            borderTopRightRadius: !sameUser && mySms ? 0 : 7,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            elevation: 1,
            maxWidth: width * 0.8
          }}
        >
          {group && !mySms && (!sameUser || !sameDate) && (
            <Paragraph
              style={{
                fontSize: 13,
                color: Colors.FADE_ACCENT,
                fontWeight: 'bold',
                lineHeight: 14
              }}
            >
              {smsOwnerName}
            </Paragraph>
          )}

          {type === 'TEXT' && (
            <Paragraph
              onLongPress={() => {
                Clipboard.setString(text);
                ToastAndroid.show('Text Copied', ToastAndroid.SHORT);
              }}
              style={{
                fontSize: 16,
                lineHeight: 20,
                marginRight: mySms ? 80 : 60
              }}
            >
              {text}
            </Paragraph>
          )}

          {type === 'LOCATION' && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={_handleOpenGps}
              style={{ flexDirection: 'row' }}
            >
              <Image
                source={{ uri: locationThumbnail }}
                style={{
                  width: 150,
                  height: 100,
                  marginRight: 5,
                  borderRadius: 5
                }}
              />
              <Paragraph
                style={{
                  width: width * 0.8 - 170,
                  fontSize: 14,
                  marginHorizontal: 5,
                  marginTop: 5,
                  lineHeight: 18
                }}
                numberOfLines={4}
              >
                {address}
              </Paragraph>
            </TouchableOpacity>
          )}

          {type === 'IMAGE' && (
            <TouchableOpacity
              style={{
                width: 200,
                height: 200,
                marginHorizontal: -5,
                marginBottom: 20
              }}
              activeOpacity={1}
              onPress={previewImage.bind(this, {
                owner: smsOwnerName,
                date: createdAt,
                uri: APP_URLS.SERVE_MESSAGE_IMAGE(attachment.file_name)
              })}
            >
              <Image
                source={{
                  uri: APP_URLS.SERVE_MESSAGE_IMAGE(attachment.file_name)
                }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 5
                }}
              />
            </TouchableOpacity>
          )}

          <Paragraph
            style={{
              fontSize: 12,
              color: Colors.MEDIUM,
              position: 'absolute',
              bottom: 0,
              right: mySms ? 30 : 10
            }}
          >
            {moment(createdAt).format('h:m a')}
          </Paragraph>

          {mySms && (
            <>
              <IconButton
                icon='check'
                size={15}
                color={seen ? '#60bef0' : '#8d918c'}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 10,
                  margin: 0
                }}
              />

              {recieved && (
                <IconButton
                  icon='check'
                  size={15}
                  color={seen ? '#60bef0' : '#8d918c'}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 5,
                    margin: 0
                  }}
                />
              )}
            </>
          )}
        </Surface>
      </View>
    </>
  );
};

export default MessageCard;
