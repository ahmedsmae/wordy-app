import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { createStructuredSelector } from 'reselect';

import {
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { PlaceholderParagraph } from '../../components';
import InputSubmit from './input-submit.component';
import MessageCard from './message-card.component';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { APP_URLS, BASE_URL } from '../../redux/utils/urls';

class Chatting extends React.Component {
  constructor(props) {
    super(props);
    this.socket;
    this.flatMessages;

    this.state = {
      opponent: this.props.navigation.getParam('opponent'),
      newMessage: '',
      messages: []
    };
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  componentDidMount() {
    const userId = this.props.currentUser._id;
    const opponentId = this.state.opponent._id;

    try {
      this.socket = io(BASE_URL, {
        // This info will be recieved in the handshake object in the backend socket
        query: { msg: 'Welcome to our new connection', userId, opponentId }
      });

      this.socket.on('send_chat_from_server', ({ _id, messages }) => {
        const unseenMessages = messages.map(({ _id, seen, owner }) => {
          if (!seen && owner !== userId) {
            return _id;
          }
        });

        this.setState({ messages }, () => {
          this.socket.emit('update_messages_to_seen', unseenMessages);
        });
      });

      this.socket.on('all_messages', messages => {
        this.setState(
          {
            messages: messages.map(sms =>
              userId !== sms.owner
                ? { ...sms, recieved: true, seen: true }
                : sms
            )
          },
          () => {
            this.socket.emit('update_message_to_recieved', userId);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  _scrollToBottom = () => this.flatMessages.scrollToEnd({ animated: true });

  _handleSend = () => {
    const userId = this.props.currentUser._id;
    const { newMessage } = this.state;

    if (newMessage.trim() === '') return;

    try {
      this.socket.emit(
        'create_new_message',
        { text: newMessage, owner: userId },
        err => {
          this.setState({ newMessage: '' });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { navigation, currentUser } = this.props;
    const { opponent, newMessage, messages } = this.state;
    const { sign_in_method, _id, image_url, name, email } = opponent;

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

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView
            contentContainerStyle={{ flex: 1, backgroundColor: '#faf3e6' }}
            keyboardShouldPersistTaps="always"
          >
            {messages.length === 0 ? (
              <PlaceholderParagraph
                title="This chat still empty"
                subtitle="Be Wordy and send the first message..."
              />
            ) : (
              <FlatList
                style={{ flex: 1, marginHorizontal: 10, marginBottom: 60 }}
                ref={el => (this.flatMessages = el)}
                onContentSizeChange={this._scrollToBottom}
                onLayout={this._scrollToBottom}
                data={messages}
                keyExtractor={({ _id }) => _id}
                renderItem={({ item, index }) => (
                  <MessageCard
                    message={item}
                    userId={currentUser._id}
                    messages={messages}
                    index={index}
                  />
                )}
              />
            )}

            <InputSubmit
              text={newMessage}
              onChangeText={text => this.setState({ newMessage: text })}
              onSend={this._handleSend}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {}
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Chatting);
