import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import { IconButton, Appbar, Avatar } from 'react-native-paper';
import { PlaceholderParagraph } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectCurrentChat } from '../../redux/chats/chats.selectors';

import { APP_URLS } from '../../redux/utils/urls';

const Chatting = ({ navigation, currentChat, currentUser }) => {
  console.log(currentChat);

  const [message, setMessage] = useState('');

  let opponent;

  if (currentChat) {
    opponent = currentChat.opponents.find(({ _id }) => _id !== currentUser._id);
    console.log(opponent);
  }

  const _handleSend = () => {
    if (message.trim() === '') return;
    // action

    setMessage('');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Avatar.Image
          size={40}
          source={{
            uri:
              opponent && opponent.sign_in_method === 'EMAIL/PASSWORD'
                ? `${APP_URLS.SERVER_USER_AVATAR.url}/${opponent._id}`
                : opponent && opponent.image_url
          }}
        />
        <Appbar.Content
          title={opponent && opponent.name}
          subtitle={opponent && opponent.email}
        />
      </Appbar.Header>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.screen}
          keyboardShouldPersistTaps="handled"
        >
          {currentChat && currentChat.messages.length === 0 ? (
            <PlaceholderParagraph
              title="This chat still empty"
              subtitle="Be Wordy and send the first message..."
            />
          ) : (
            <FlatList
              style={{ flex: 1 }}
              data={currentChat && currentChat.messages}
              keyExtractor={({ _id }) => _id}
              renderItem={({ item: { _id, text, createdAt, owner } }) => {
                return <></>;
              }}
            />
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="grey"
              underlineColor="transparent"
              underlineColorAndroid="transparent"
              value={message}
              onChangeText={text => setMessage(text)}
              placeholder="Type a message..."
            />
            <IconButton
              style={styles.button}
              color="white"
              icon="send"
              size={25}
              onPress={_handleSend}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    fontSize: 17,
    backgroundColor: 'lightgrey',
    marginLeft: 5,
    flex: 1,
    height: 50,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 3,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: 'tomato',
    padding: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 3
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    margin: 2,
    bottom: 0,
    left: 0,
    right: 0
  }
});

const mapStateToProps = createStructuredSelector({
  currentChat: selectCurrentChat,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Chatting);
