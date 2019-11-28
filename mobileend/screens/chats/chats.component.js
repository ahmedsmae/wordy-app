import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { StyleSheet, FlatList } from 'react-native';
import { Appbar, FAB, Provider, Menu, Divider } from 'react-native-paper';
import { PlaceholderParagraph, ListItem } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectUserChats } from '../../redux/chats/chats.selectors';
import { getAllUserChatsStart } from '../../redux/chats/chats.actions';
import { getChatImageSource, getOpponent } from '../../utils/helper-functions';
import blankUserImage from '../../assets/user.png';
import blankGroupImage from '../../assets/group.png';

const Chats = ({
  navigation,
  currentUser,
  userChats,
  getAllUserChatsStart
}) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    getAllUserChatsStart(err => {});
  }, []);

  const _handleSelect = (chat, opponent) => {
    navigation.navigate('Chatting', { chat, opponent });
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

          <Divider />

          <Menu.Item
            style={{ paddingVertical: 0 }}
            icon="plus"
            onPress={() => {
              setShowMenu(false);
              navigation.navigate('EditGroup');
            }}
            title="Create Group"
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
          renderItem={({ item }) => {
            const { _id, opponents, messages, group, name } = item;
            const opponent = getOpponent(opponents, currentUser._id);

            return (
              <ListItem
                imageSource={getChatImageSource(item, opponent)}
                title={group ? name : opponent.name}
                subtitle={messages.length ? messages[0].text : ''}
                time={
                  messages.length
                    ? moment(messages[0].createdAt).format('h:m a')
                    : ''
                }
                onPress={_handleSelect.bind(this, item, opponent)}
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
