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
import { PlaceholderParagraph } from '../../components';
import InputSubmit from './input-submit.component';
import MessageCard from './message-card.component';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { BASE_URL } from '../../redux/utils/urls';

class Chatting extends React.Component {
  constructor(props) {
    super(props);
    this.socket;
    this.flatListMessages = React.createRef();

    this.state = { group: false, opponents: [], messages: [], newMessage: '' };
  }

  componentWillUnmount() {
    this.socket.close();
  }

  componentWillReceiveProps({ contact }) {
    const userId = this.props.currentUser._id;

    if (contact) {
      const contactText = `${contact.name}\n${contact.phoneNumbers
        .map(({ number }) => number)
        .join(', ')}`;

      try {
        this.socket.emit(
          'new_message_from_client',
          { text: contactText, owner: userId },
          err => {
            this.setState({ newMessage: '' });
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  componentDidMount() {
    const { chatId } = this.props;

    try {
      this.socket = io(BASE_URL, { query: { chatId } });

      this.socket.on('init_chat_from_server', chat => {
        this.setState({
          messages: chat.messages,
          opponents: chat.opponents,
          group: chat.group
        });
      });

      this.socket.on('new_message_from_server', message => {
        this.setState({ messages: this.state.messages.concat(message) });
      });
    } catch (err) {
      console.log(err);
    }
  }

  _scrollToBottom = () =>
    this.flatListMessages.current.scrollToEnd({ animated: false });

  _handleSend = () => {
    const userId = this.props.currentUser._id;
    const { newMessage } = this.state;

    if (newMessage.trim() === '') return;

    try {
      this.socket.emit(
        'new_message_from_client',
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
    const { currentUser, navigateToContacts } = this.props;
    const { newMessage, messages, opponents, group } = this.state;

    return (
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
              ref={this.flatListMessages}
              onContentSizeChange={this._scrollToBottom}
              onLayout={this._scrollToBottom}
              data={messages}
              keyExtractor={({ _id }) => _id}
              renderItem={({ item, index }) => (
                <MessageCard
                  message={item}
                  userId={currentUser._id}
                  messages={messages}
                  opponents={opponents}
                  index={index}
                  group={group}
                />
              )}
            />
          )}

          <InputSubmit
            text={newMessage}
            onChangeText={text => this.setState({ newMessage: text })}
            onSend={this._handleSend}
            onImageFromCamera={image => {}}
            onImageFromGallery={image => {}}
            navigateToContacts={navigateToContacts}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
