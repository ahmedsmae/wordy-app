import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { Notifications } from 'expo';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from 'react-native';
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
import { updateUserNotificationTokenStart } from '../../redux/current-user/current-user.actions';
import { getAllUserChatsStart } from '../../redux/chats/chats.actions';
import { getChatImageSource, getOpponent } from '../../utils/helper-functions';
import { verifyPushNotificationsPermission } from '../../utils/verify-permissions';

import Colors from '../../utils/colors';

class Chats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      searchMode: false,
      searchQ: '',
      isRefreshing: false
    };
  }

  displayList = () =>
    this.props.userChats.filter(({ group, name, opponents }) => {
      const chatName = group
        ? name
        : getOpponent(opponents, this.props.currentUser._id).name;
      return chatName.toLowerCase().includes(this.state.searchQ.toLowerCase());
    });

  loadData = () => {
    this.setState({ isRefreshing: true });
    this.props.getAllUserChatsStart(err => {
      if (err) return console.log(err);
      this.setState({ isRefreshing: false });
    });
  };

  componentDidMount() {
    this.loadData();
    this.getPushNotificationToken();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  // componentWillUnmount() {
  //   if (this.notificationListener) {
  //     Notifications.removeListener(this.notificationListener);
  //   }
  // }

  _handleNotification = ({ origin, data }) => {
    console.log(origin, data);
    Alert.alert(
      `Message ${origin}`,
      moment(data.text).format('MMMM Do YYYY, h:mm:ss a'),
      [{ text: data.option1 }, { text: data.option2 }]
    );
  };

  getPushNotificationToken = async () => {
    const notificationToken = await AsyncStorage.getItem('NOTIFICATION_TOKEN');

    if (!notificationToken) {
      const hasPermission = await verifyPushNotificationsPermission();
      if (!hasPermission) return;

      const token = await Notifications.getExpoPushTokenAsync();

      this.props.updateUserNotificationTokenStart(token, err => {});
    }
  };

  _handleSelect = (chat, opponent) =>
    this.props.navigation.navigate('Chatting', { chat, opponent });

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

  render() {
    const { showMenu, searchMode, isRefreshing, searchQ } = this.state;
    const { navigation, currentUser, randomDate } = this.props;

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
                this.setState({ searchQ: text });
                if (text.length === 0) {
                  this.setState({ searchMode: false });
                }
              }}
            />
          ) : (
            <>
              <Appbar.Content title="WordyApp" />
              <Appbar.Action
                icon="magnify"
                color="white"
                onPress={() => this.setState({ searchMode: true })}
              />
            </>
          )}

          <Menu
            visible={showMenu}
            onDismiss={() => this.setState({ showMenu: false })}
            anchor={
              <Appbar.Action
                icon="dots-vertical"
                color="white"
                onPress={() => this.setState({ showMenu: true })}
              />
            }
          >
            <Menu.Item
              style={{ paddingVertical: 0 }}
              icon="settings"
              onPress={() => {
                this.setState({ showMenu: false });
                navigation.navigate('Settings');
              }}
              title="Settings"
            />

            <Divider />

            <Menu.Item
              style={{ paddingVertical: 0 }}
              icon="plus"
              onPress={() => {
                this.setState({ showMenu: false });
                navigation.navigate('EditGroup');
              }}
              title="Create Group"
            />
          </Menu>
        </Appbar.Header>

        <FlatList
          style={{ flex: 1 }}
          onRefresh={this.loadData}
          refreshing={isRefreshing}
          data={this.displayList()}
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
                onPress={this._handleSelect.bind(this, item, opponent)}
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
  }
}

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
    dispatch(getChatByIdStart(chatId, callback)),
  updateUserNotificationTokenStart: (notificationToken, callback) =>
    dispatch(updateUserNotificationTokenStart(notificationToken, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chats);
