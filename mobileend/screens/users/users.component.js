import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyleSheet, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import { PlaceholderParagraph, ListItem } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectAllUsers } from '../../redux/users/users.selectors';
import { getAllUsersStart } from '../../redux/users/users.actions';
import { getChatByOpponentIdStart } from '../../redux/chats/chats.actions';

import { APP_URLS } from '../../redux/utils/urls';

const Users = ({
  navigation,
  currentUser,
  allUsers,
  getAllUsersStart,
  getChatByOpponentIdStart
}) => {
  useEffect(() => {
    getAllUsersStart(err => {});
  }, []);

  const _handleSelect = userId => {
    getChatByOpponentIdStart(userId, err => {});
    navigation.navigate('Chatting');
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Users" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>

      {allUsers.length === 0 ? (
        <PlaceholderParagraph
          title="There is no users for now"
          subtitle="Share Wordy with some friends ans start chatting."
        />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={allUsers}
          keyExtractor={({ _id }) => _id}
          renderItem={({
            item: { _id, name, status, email, image_url, sign_in_method }
          }) => {
            return (
              <ListItem
                imageSource={
                  sign_in_method === 'EMAIL/PASSWORD'
                    ? `${APP_URLS.SERVER_USER_AVATAR.url}/${_id}`
                    : image_url
                }
                title={name}
                subtitle={status}
                onPress={_handleSelect.bind(this, _id)}
              />
            );
          }}
        />
      )}
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
  allUsers: selectAllUsers
});

const mapDispatchToProps = dispatch => ({
  getAllUsersStart: callback => dispatch(getAllUsersStart(callback)),
  getChatByOpponentIdStart: (opponentId, callback) =>
    dispatch(getChatByOpponentIdStart(opponentId, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
