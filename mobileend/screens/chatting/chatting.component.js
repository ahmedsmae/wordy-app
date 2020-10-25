import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
import { createStructuredSelector } from 'reselect';
import * as ImageManipulator from 'expo-image-manipulator';
import ImageViewer from 'react-native-image-zoom-viewer';

import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Modal,
  Dimensions,
  BackHandler
} from 'react-native';
import { Paragraph, IconButton, Caption } from 'react-native-paper';
import { PlaceholderParagraph } from '../../components';
import InputSubmit from './input-submit.component';
import MessageCard from './message-card.component';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { uploadMessageImageStart } from '../../redux/chats/chats.actions';
import { BASE_URL } from '../../redux/utils/urls';
import { calcDesiredWidthHeight } from '../../utils/helper-functions';

const { width } = Dimensions.get('window');

class Chatting extends React.Component {
  constructor(props) {
    super(props);
    this.socket;
    this.flatListMessages = React.createRef();

    this.state = {
      group: false,
      opponents: [],
      messages: [],
      newMessage: '',
      previewImage: { uri: '', owner: '', date: '' },
      showImagePreview: false
    };
  }

  componentWillUnmount() {
    this.socket.close();
    // this.backHandler.remove();
  }

  UNSAFE_componentWillReceiveProps({ contact }) {
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

    // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //   console.log('going back');

    //   if (this.state.showImagePreview) {
    //     this.setState({ showImagePreview: false });
    //     return true;
    //   }
    // });
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

    const imageFileName = `${Date.now().toString()}.jpg`;
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
    const {
      newMessage,
      messages,
      opponents,
      group,
      showImagePreview,
      previewImage
    } = this.state;

    return (
      <>
        <ImageBackground
          source={require('../../assets/chat-bg.jpg')}
          resizeMode='repeat'
          style={styles.imageBg}
          imageStyle={{ opacity: 0.3 }}
        />

        <Modal visible={showImagePreview} transparent={true}>
          <ImageViewer
            imageUrls={[
              {
                url: previewImage.uri,
                props: { owner: previewImage.owner, date: previewImage.date }
              }
            ]}
            renderIndicator={() => null} // no 1/1
            renderFooter={() => (
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
                  {previewImage.owner}
                </Paragraph>

                <Caption style={{ color: 'white' }}>date </Caption>
                <Paragraph style={{ color: 'white', fontSize: 14 }}>
                  {moment(previewImage.date).calendar(null, {
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
                  onPress={() => this.setState({ showImagePreview: false })}
                />
              </View>
            )}
          />
        </Modal>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps='always'
          >
            <FlatList
              style={{ flex: 1, marginHorizontal: 10, marginBottom: 60 }}
              ListEmptyComponent={() => (
                <PlaceholderParagraph
                  title='This chat still empty'
                  subtitle='Be Wordy and send the first message...'
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
                  previewImage={image =>
                    this.setState({
                      previewImage: image,
                      showImagePreview: true
                    })
                  }
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
