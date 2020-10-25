import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  View,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal
} from 'react-native';
import {
  List,
  Avatar,
  Paragraph,
  Headline,
  Divider,
  IconButton,
  Caption
} from 'react-native-paper';
import ImageViewer from 'react-native-image-zoom-viewer';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';
import { selectSelectedChat } from '../../redux/chats/chats.selectors';
import {
  getChatByIdStart,
  removeUserFromChatStart
} from '../../redux/chats/chats.actions';

import { APP_URLS } from '../../redux/utils/urls';
import {
  getChatImageSource,
  getOpponent,
  getUserImageSource
} from '../../utils/helper-functions';

const { width } = Dimensions.get('window');

const ChatInfo = ({
  navigation,
  currentUser,
  selectedChat,
  getChatByIdStart,
  removeUserFromChatStart,
  randomDate
}) => {
  const chatId = navigation.getParam('chatId');

  const [currentIndex, setCurrentIndex] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const displayName = () => {
    if (selectedChat.group) {
      return selectedChat.name;
    } else if (!selectedChat.group) {
      return getOpponent(selectedChat.opponents, currentUser._id).name;
    }
    return null;
  };

  const displayStatus = () => {
    if (selectedChat.group) {
      return selectedChat.status;
    } else if (!selectedChat.group) {
      return getOpponent(selectedChat.opponents, currentUser._id).status;
    }
    return null;
  };

  const displayEmail = () => {
    if (!selectedChat.group) {
      return getOpponent(selectedChat.opponents, currentUser._id).email;
    }
    return null;
  };

  const imageMessages = () =>
    selectedChat.messages.filter(({ type }) => type === 'IMAGE');

  const opponents = () =>
    selectedChat.opponents.filter(
      ({ _id }) => String(_id) !== String(currentUser._id)
    );

  const images = () =>
    imageMessages().map(({ attachment: { file_name }, createdAt, owner }) => {
      return {
        url: APP_URLS.SERVE_MESSAGE_IMAGE(file_name),
        owner: selectedChat.opponents.find(({ _id }) => _id === owner).name,
        date: createdAt
      };
    });

  useEffect(() => {
    getChatByIdStart(chatId, err => {});
  }, []);

  if (!selectedChat) {
    return (
      <>
        <ActivityIndicator style={{ flex: 1 }} size='large' />
        <IconButton
          style={{
            position: 'absolute',
            top: 25,
            left: 0,
            backgroundColor: 'white'
          }}
          size={30}
          icon='arrow-left'
          onPress={() => navigation.goBack()}
        />
      </>
    );
  }

  return (
    <>
      <Modal visible={showPreview} transparent={true}>
        <ImageViewer
          imageUrls={images()}
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
                {images()[cIndex].owner}
              </Paragraph>

              <Caption style={{ color: 'white' }}>date </Caption>
              <Paragraph style={{ color: 'white', fontSize: 14 }}>
                {moment(images()[cIndex].date).calendar(null, {
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
                  sameElse: 'DD/MM/YYYY'
                })}
              </Paragraph>
              <IconButton
                icon='close'
                color='white'
                size={30}
                onPress={() => setShowPreview(false)}
              />
            </View>
          )}
        />
      </Modal>

      <ScrollView style={{ flex: 1 }}>
        <Image
          source={getChatImageSource(
            selectedChat,
            getOpponent(selectedChat.opponents, currentUser._id),
            randomDate
          )}
          style={{ width, height: width / 1.5 }}
          resizeMode='cover'
        />

        <View style={{ paddingHorizontal: 10 }}>
          {!!displayName() && <Headline>{displayName()}</Headline>}
          {!!displayStatus() && <Paragraph>{displayStatus()}</Paragraph>}
          {!!displayEmail() && <Paragraph>{displayEmail()}</Paragraph>}
        </View>

        {imageMessages().length > 0 && (
          <>
            <Divider style={{ marginTop: 10 }} />

            <View style={{ paddingHorizontal: 10 }}>
              <Paragraph style={{ fontWeight: 'bold' }}>
                Shared Images
              </Paragraph>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {imageMessages().map(
                  ({ attachment: { file_name }, _id }, index) =>
                    index < 10 && (
                      <TouchableOpacity
                        key={_id}
                        style={{
                          width: 100,
                          height: 100,
                          padding: 2
                        }}
                        activeOpacity={0.8}
                        onPress={() => {
                          setCurrentIndex(index);
                          setShowPreview(true);
                        }}
                      >
                        <Image
                          style={{ flex: 1, borderRadius: 5 }}
                          source={{
                            uri: APP_URLS.SERVE_MESSAGE_IMAGE(file_name)
                          }}
                        />
                      </TouchableOpacity>
                    )
                )}
                {imageMessages().length > 10 && (
                  <TouchableOpacity
                    style={{
                      width: 96,
                      height: 96,
                      margin: 2,
                      backgroundColor: 'lightgrey',
                      borderRadius: 5,
                      justifyContent: 'center'
                    }}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('SharedImages', {
                        messages: imageMessages(),
                        opponents: selectedChat.opponents // should be all opponents including the current user
                      })
                    }
                  >
                    <Paragraph
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        fontWeight: 'bold'
                      }}
                    >{`${imageMessages().length - 10} more ${
                      imageMessages().length - 10 === 1 ? 'image' : 'images'
                    }...`}</Paragraph>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </View>
          </>
        )}

        {selectedChat.group && (
          <>
            <Divider style={{ marginTop: 10 }} />

            <View style={{ paddingHorizontal: 10 }}>
              <Paragraph style={{ fontWeight: 'bold' }}>
                Chat Participants
              </Paragraph>
              <FlatList
                data={opponents()}
                keyExtractor={({ _id }) => String(_id)}
                renderItem={({ item }) => {
                  const { name, email } = item;

                  return (
                    <List.Item
                      title={name}
                      titleNumberOfLines={1}
                      description={email}
                      descriptionNumberOfLines={1}
                      left={props => (
                        <Avatar.Image
                          {...props}
                          style={{ marginRight: 5 }}
                          size={50}
                          source={getUserImageSource(item, randomDate)}
                        />
                      )}
                      onPress={() =>
                        navigation.navigate('Chatting', {
                          opponent: item,
                          // to prevent from going back to the previous chat and open new chat with this opponent
                          chat: null
                        })
                      }
                    />
                  );
                }}
              />
            </View>
          </>
        )}
      </ScrollView>

      <IconButton
        style={{
          position: 'absolute',
          top: 25,
          left: 0
        }}
        size={30}
        color='white'
        icon='arrow-left'
        onPress={() => navigation.goBack()}
      />

      {selectedChat.group &&
        String(selectedChat.admin._id) === String(currentUser._id) && (
          <IconButton
            style={{
              position: 'absolute',
              top: 30,
              right: 10
            }}
            size={25}
            icon='pencil'
            color='white'
            onPress={() =>
              navigation.navigate('EditGroup', { group: selectedChat })
            }
          />
        )}

      {selectedChat.group &&
        String(selectedChat.admin._id) !== String(currentUser._id) && (
          <IconButton
            style={{
              position: 'absolute',
              top: 25,
              right: 10
            }}
            size={30}
            icon='close'
            color='white'
            onPress={() =>
              Alert.alert(
                'Leave Chat',
                'Would you like to leave this chat room ?',
                [
                  { text: 'CANCEL' },
                  {
                    text: 'LEAVE',
                    onPress: () =>
                      removeUserFromChatStart(selectedChat._id, err => {
                        navigation.navigate('Chats');
                      })
                  }
                ]
              )
            }
          />
        )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  randomDate: selectRandomDate,
  selectedChat: selectSelectedChat
});

const mapDispatchToProps = dispatch => ({
  getChatByIdStart: (chatId, callback) =>
    dispatch(getChatByIdStart(chatId, callback)),
  removeUserFromChatStart: (chatId, callback) =>
    dispatch(removeUserFromChatStart(chatId, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInfo);
