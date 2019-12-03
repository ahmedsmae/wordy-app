import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ActivityIndicator } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import Chatting from './chatting.component';

import { selectCurrentChatId } from '../../redux/chats/chats.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';
import { getChatIdStart } from '../../redux/chats/chats.actions';
import { getChatImageSource } from '../../utils/helper-functions';

const ChattingContainer = ({
  navigation,
  getChatIdStart,
  currentChatId,
  randomDate
}) => {
  const chat = navigation.getParam('chat');
  const opponent = navigation.getParam('opponent');
  const contact = navigation.getParam('contact');

  const { name, email } = opponent;

  if (chat) {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Avatar.Image
            size={40}
            source={getChatImageSource(chat, opponent, randomDate)}
          />
          <Appbar.Content
            title={chat.group ? chat.name : opponent.name}
            subtitle={chat.group ? chat.status : opponent.email}
            onPress={() =>
              navigation.navigate('ChatInfo', { chatId: chat._id })
            }
          />
        </Appbar.Header>

        <Chatting
          chatId={chat._id}
          navigateToContacts={() => navigation.navigate('Contacts')}
          contact={contact}
        />
      </>
    );
  }

  useEffect(() => {
    !chat && !currentChatId && getChatIdStart(opponent._id, err => {});
  });

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
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Avatar.Image
            size={40}
            source={getChatImageSource(chat, opponent, randomDate)}
          />
          <Appbar.Content
            title={name}
            subtitle={email}
            onPress={() =>
              navigation.navigate('ChatInfo', { chatId: currentChatId })
            }
          />
        </Appbar.Header>

        <Chatting
          chatId={currentChatId}
          navigateToContacts={() => navigation.navigate('Contacts')}
          contact={contact}
        />
      </>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  currentChatId: selectCurrentChatId,
  randomDate: selectRandomDate
});

const mapDispatchToProps = dispatch => ({
  getChatIdStart: (opponentId, callback) =>
    dispatch(getChatIdStart(opponentId, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChattingContainer);
