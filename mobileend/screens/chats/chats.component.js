import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { StyleSheet, FlatList } from 'react-native';
import { Appbar, FAB, Provider, Menu } from 'react-native-paper';
import { PlaceholderParagraph, ListItem } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectUserChats } from '../../redux/chats/chats.selectors';
import {
  getAllUserChatsStart,
  getChatByIdStart
} from '../../redux/chats/chats.actions';

import chatsData from './chats.data';

const Chats = ({
  navigation,
  currentUser,
  userChats,
  getAllUserChatsStart,
  getChatByIdStart
}) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    getAllUserChatsStart(err => {});
  }, []);

  const _handleSelect = chatId => {
    getChatByIdStart(chatId, err => {});
    navigation.navigate('Chatting');
  };

  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: 'teal' }}>
        <Appbar.Content title="WordyApp" />
        <Appbar.Action icon="magnify" onPress={() => {}} />

        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={() => setShowMenu(true)}
            />
          }
        >
          <Menu.Item
            style={{ paddingVertical: 0 }}
            icon="settings"
            onPress={() => {
              setShowMenu(false);
              navigation.navigate('Settings');
            }}
            title="Settings"
          />
        </Menu>
      </Appbar.Header>

      {userChats.length === 0 ? (
        <PlaceholderParagraph
          title="You do not have any chats yet"
          subtitle="Select user and start chatting now"
          caption="Enjoy !"
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={userChats}
          keyExtractor={({ _id }) => _id}
          renderItem={({ item: { _id, opponents, messages } }) => {
            const opponent = opponents.find(
              ({ _id }) => _id !== currentUser._id
            );
            return (
              <ListItem
                imageSource={opponent.image_url}
                title={opponent.name}
                subtitle={messages.length ? messages[0].text : ''}
                time={
                  messages.length
                    ? moment(messages[0].createdAt).format('h:m a')
                    : ''
                }
                onPress={_handleSelect.bind(this, _id)}
              />
            );
          }}
        />
      )}
      <FAB
        style={styles.fab}
        icon="account-group"
        color="white"
        onPress={() => navigation.navigate('Users')}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'tomato'
  }
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userChats: selectUserChats
});

const mapDispatchToProps = dispatch => ({
  getAllUserChatsStart: callback => dispatch(getAllUserChatsStart(callback)),
  getChatByIdStart: (chatId, callback) =>
    dispatch(getChatByIdStart(chatId, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
