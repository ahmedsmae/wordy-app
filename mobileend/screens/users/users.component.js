import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyleSheet, FlatList, View } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { PlaceholderParagraph, ListItem } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectAllUsers } from '../../redux/users/users.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';
import { getAllUsersStart } from '../../redux/users/users.actions';

import { getUserImageSource } from '../../utils/helper-functions';

const Users = ({ navigation, allUsers, getAllUsersStart, randomDate }) => {
  const [searchMode, setSearchMode] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    getAllUsersStart(err => {
      setIsRefreshing(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const _handleSelect = opponent => {
    navigation.navigate('Chatting', { opponent });
  };

  const displayList = allUsers.filter(({ name }) =>
    name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <>
      <Appbar.Header>
        {searchMode ? (
          <Searchbar
            placeholder="Search username..."
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
            <Appbar.Action
              icon="arrow-left"
              color="white"
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content title="Users" />
            <Appbar.Action
              icon="magnify"
              color="white"
              onPress={() => setSearchMode(true)}
            />
          </>
        )}
      </Appbar.Header>

      <FlatList
        style={{ flex: 1 }}
        onRefresh={loadData}
        refreshing={isRefreshing}
        ListEmptyComponent={() => (
          <PlaceholderParagraph
            title="There is no users for now"
            subtitle="Share Wordy with some friends ans start chatting."
          />
        )}
        data={displayList}
        keyExtractor={({ _id }) => String(_id)}
        renderItem={({ item }) => {
          const { name, status } = item;

          return (
            <ListItem
              imageSource={getUserImageSource(item, randomDate)}
              title={name}
              subtitle={status}
              onPress={_handleSelect.bind(this, item)}
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  allUsers: selectAllUsers,
  randomDate: selectRandomDate
});

const mapDispatchToProps = dispatch => ({
  getAllUsersStart: callback => dispatch(getAllUsersStart(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
