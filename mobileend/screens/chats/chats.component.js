import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import {
  Appbar,
  FAB,
  Provider,
  Menu,
  Divider,
  Searchbar
} from 'react-native-paper';
import { PlaceholderParagraph, ListItem } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectUserChats } from '../../redux/chats/chats.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';
import { getAllUserChatsStart } from '../../redux/chats/chats.actions';
import { getChatImageSource, getOpponent } from '../../utils/helper-functions';

import Colors from '../../utils/colors';

const Chats = ({
  navigation,
  currentUser,
  userChats,
  getAllUserChatsStart,
  randomDate
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    getAllUserChatsStart(err => {
      setIsRefreshing(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const _handleSelect = (chat, opponent) => {
    navigation.navigate('Chatting', { chat, opponent });
  };

  const displayList = userChats.filter(({ group, name, opponents }) => {
    const chatName = group
      ? name
      : getOpponent(opponents, currentUser._id).name;
    return chatName.toLowerCase().includes(searchQ.toLowerCase());
  });

  // if (!userChats.length) {
  //   return (
  //     <>
  //       <Appbar.Header style={{ backgroundColor: 'teal' }}>
  //         <Appbar.Content title="WordyApp" />
  //       </Appbar.Header>

  //       <ActivityIndicator style={{ flex: 1 }} size="large" />
  //     </>
  //   );
  // }

  return (
    <Provider>
      <Appbar.Header style={{ backgroundColor: Colors.PRIMARY }}>
        {searchMode ? (
          <Searchbar
            placeholder="Search chat name or username..."
            value={searchQ}
            autoFocus
            clearButtonMode="always"
            onChangeText={text => {
              setSearchQ(text);
              if (text.length === 0) {
                setSearchMode(false);
              }
            }}
          />
        ) : (
          <>
            <Appbar.Content title="WordyApp" />
            <Appbar.Action
              icon="magnify"
              color="white"
              onPress={() => setSearchMode(true)}
            />
          </>
        )}

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

      <FlatList
        style={{ flex: 1 }}
        onRefresh={loadData}
        refreshing={isRefreshing}
        data={displayList}
        ListEmptyComponent={() => (
          <PlaceholderParagraph
            title="You do not have any chats yet"
            subtitle="Select user and start chatting now"
            caption="Enjoy !"
          />
        )}
        keyExtractor={({ _id }) => String(_id)}
        renderItem={({ item }) => {
          const { _id, opponents, messages, group, name } = item;
          const opponent = getOpponent(opponents, currentUser._id);

          return (
            <ListItem
              imageSource={getChatImageSource(item, opponent, randomDate)}
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
    backgroundColor: Colors.ACCENT
  }
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userChats: selectUserChats,
  randomDate: selectRandomDate
});

const mapDispatchToProps = dispatch => ({
  getAllUserChatsStart: callback => dispatch(getAllUserChatsStart(callback)),
  getChatByIdStart: (chatId, callback) =>
    dispatch(getChatByIdStart(chatId, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
