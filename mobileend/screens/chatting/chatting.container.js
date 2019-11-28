import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ActivityIndicator } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import Chatting from './chatting.component';

import { selectCurrentChatId } from '../../redux/chats/chats.selectors';
import { getChatIdStart } from '../../redux/chats/chats.actions';
import { APP_URLS } from '../../redux/utils/urls';
import { getChatImageSource } from '../../utils/helper-functions';

const ChattingContainer = ({ navigation, getChatIdStart, currentChatId }) => {
  const chat = navigation.getParam('chat');
  const opponent = navigation.getParam('opponent');

  const { sign_in_method, _id, image_url, name, email } = opponent;

  if (chat) {
    return (
      <>
        <Appbar.Header>
          <Appbar.Action
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          {!!getChatImageSource(chat, opponent) && (
            <Avatar.Image
              size={40}
              source={{
                uri: getChatImageSource(chat, opponent)
              }}
            />
          )}
          <Appbar.Content
            title={chat.group ? chat.name : opponent.name}
            subtitle={chat.group ? chat.status : opponent.email}
          />
        </Appbar.Header>

        <Chatting chatId={chat._id} />
      </>
    );
  }

  useEffect(() => {
    !chat && !currentChatId && getChatIdStart(opponent._id, err => {});
  });

  // we are coming from the users screen (can not be group chat)
  if (!currentChatId) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, alignSelf: 'center' }}
      />
    );
  } else {
    return (
      <>
        <Appbar.Header>
          <Appbar.Action
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
          <Avatar.Image
            size={40}
            source={{
              uri:
                sign_in_method === 'EMAIL/PASSWORD'
                  ? `${APP_URLS.SERVER_USER_AVATAR.url}/${_id}`
                  : image_url
            }}
          />
          <Appbar.Content title={name} subtitle={email} />
        </Appbar.Header>

        <Chatting chatId={currentChatId} />
      </>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  currentChatId: selectCurrentChatId
});

const mapDispatchToProps = dispatch => ({
  getChatIdStart: (opponentId, callback) =>
    dispatch(getChatIdStart(opponentId, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChattingContainer);
