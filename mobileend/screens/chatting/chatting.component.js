import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { createStructuredSelector } from 'reselect';
import * as ImageManipulator from 'expo-image-manipulator';

import {
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';
import { PlaceholderParagraph } from '../../components';
import InputSubmit from './input-submit.component';
import MessageCard from './message-card.component';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { uploadMessageImageStart } from '../../redux/chats/chats.actions';
import { BASE_URL } from '../../redux/utils/urls';
import { calcDesiredWidthHeight } from '../../utils/helper-functions';

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

  _handleSendText = () => {
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

  _handleSendLocation = location => {
    const userId = this.props.currentUser._id;

    try {
      this.socket.emit(
        'new_location_message_from_client',
        { location, owner: userId },
        err => {}
      );
    } catch (err) {
      console.log(err);
    }
  };

  _handleSendImage = async ({ uri, width, height }) => {
    const { uploadMessageImageStart, currentUser } = this.props;

    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: calcDesiredWidthHeight(width, height, 500, 500) }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    const imageFileName = Date.now().toString();
    uploadMessageImageStart(imageFileName, manipResult, err => {
      // callback after uploading message
      if (err) return console.log(err);

      try {
        this.socket.emit('new_image_message_from_client', {
          owner: currentUser._id,
          file_name: imageFileName
        });
      } catch (err) {
        console.log(err);
      }
    });
  };

  render() {
    const { currentUser, navigateToContacts } = this.props;
    const { newMessage, messages, opponents, group } = this.state;

    return (
      <>
        <ImageBackground
          source={require('../../assets/chat-bg.jpg')}
          resizeMode="repeat"
          style={styles.imageBg}
          imageStyle={{ opacity: 0.3 }}
        />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="always"
          >
            <FlatList
              style={{ flex: 1, marginHorizontal: 10, marginBottom: 60 }}
              ListEmptyComponent={() => (
                <PlaceholderParagraph
                  title="This chat still empty"
                  subtitle="Be Wordy and send the first message..."
                />
              )}
              ref={this.flatListMessages}
              onContentSizeChange={this._scrollToBottom}
              onLayout={this._scrollToBottom}
              data={messages}
              keyExtractor={({ _id }) => String(_id)}
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

            <InputSubmit
              text={newMessage}
              onChangeText={text => this.setState({ newMessage: text })}
              onSendText={this._handleSendText}
              onImageFromCamera={this._handleSendImage}
              onImageFromGallery={this._handleSendImage}
              navigateToContacts={navigateToContacts}
              onGetLocation={this._handleSendLocation}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  screen: {},
  imageBg: {
    position: 'absolute',
    top: 80,
    bottom: 0,
    right: 0,
    left: 0
  }
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  uploadMessageImageStart: (imageFileName, image, callback) =>
    dispatch(uploadMessageImageStart(imageFileName, image, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatting);
