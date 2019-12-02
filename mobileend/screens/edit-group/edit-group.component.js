import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { View, FlatList, Alert } from 'react-native';
import { Appbar, TextInput, Divider, List, Avatar } from 'react-native-paper';
import ImagePicker from './image-picker.component';
import { PlaceholderParagraph } from '../../components';

import { selectAllUsers } from '../../redux/users/users.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';
import { getAllUsersStart } from '../../redux/users/users.actions';
import { createGroupStart } from '../../redux/chats/chats.actions';
import { updateRandomDate } from '../../redux/api-utilities/api-utilities.actions';
import { APP_URLS } from '../../redux/utils/urls';
import { getUserImageSource } from '../../utils/helper-functions';

const EditGroup = ({
  navigation,
  allUsers,
  getAllUsersStart,
  createGroupStart,
  randomDate,
  updateRandomDate
}) => {
  const group = navigation.getParam('group');

  const [groupUsers, setGroupUsers] = useState(group ? group.opponents : []);
  const [groupInfo, setGroupInfo] = useState({
    groupName: group ? group.name : '',
    groupStatus: groupStatus ? group.status : '',
    groupAvatar:
      group && group.image_uploaded
        ? `${APP_URLS.SERVE_CHAT_AVATAR.url}/${group._id}?r=${randomDate}`
        : null
  });
  const [searchQ, setSearchQ] = useState('');
  const [disabled, setDisabled] = useState(false);

  const { groupName, groupStatus, groupAvatar } = groupInfo;

  useEffect(() => {
    getAllUsersStart(err => {});
  }, []);

  const _handleChange = (name, value) =>
    setGroupInfo(prev => ({ ...prev, [name]: value }));

  const displayList = allUsers.filter(({ name, email }) =>
    name
      .toLowerCase()
      .concat(email)
      .includes(searchQ.toLowerCase())
  );

  const _handleSubmit = () => {
    if (groupUsers.length < 2) {
      return Alert.alert(
        'Not Enough Users',
        'Group should contains at least 2 users with you.',
        [{ text: 'OK' }]
      );
    }

    if (groupName.length === 0) {
      return Alert.alert('Group Name Missing', 'Group should have a name', [
        { text: 'OK' }
      ]);
    }

    setDisabled(true);
    createGroupStart(
      {
        name: groupName,
        status: groupStatus,
        opponents: groupUsers,
        image_uploaded: !!groupAvatar,
        avatar: groupAvatar
      },
      err => {
        // callback action
        // snackbar if error

        updateRandomDate();
        setDisabled(false);
        navigation.goBack();
      }
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={group ? 'Edit Group' : 'Create New Group'} />
        <Appbar.Action
          icon="content-save"
          disabled={disabled}
          onPress={_handleSubmit}
        />
      </Appbar.Header>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10
        }}
      >
        <ImagePicker
          defaultImage={groupAvatar}
          onImageTaken={groupAvatar =>
            setGroupInfo(prev => ({ ...prev, groupAvatar }))
          }
        />

        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 40 }}
            mode="outlined"
            numberOfLines={1}
            label="Group Name"
            value={groupName}
            onChangeText={_handleChange.bind(this, 'groupName')}
          />
          <TextInput
            style={{ height: 40 }}
            mode="outlined"
            numberOfLines={1}
            label="Group Status"
            value={groupStatus}
            onChangeText={_handleChange.bind(this, 'groupStatus')}
          />
        </View>
      </View>

      <Divider style={{ marginTop: 10 }} />
      <TextInput
        style={{ height: 40, marginHorizontal: 10 }}
        mode="outlined"
        numberOfLines={1}
        placeholder="Search members by name or email..."
        value={searchQ}
        onChangeText={text => setSearchQ(text)}
      />
      <Divider style={{ marginBottom: 10, marginTop: 5 }} />

      <FlatList
        style={{ flex: 1 }}
        ListEmptyComponent={() => (
          <PlaceholderParagraph
            title="There is no users for now"
            subtitle="Share Wordy with some friends ans start chatting."
          />
        )}
        data={displayList}
        extraData={groupUsers}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => {
          const { name, email, _id } = item;

          return (
            <>
              <List.Item
                title={name}
                description={email}
                style={{
                  backgroundColor: groupUsers.includes(_id)
                    ? 'lightgrey'
                    : 'white',
                  paddingRight: 20
                }}
                left={props => (
                  <Avatar.Image
                    {...props}
                    size={50}
                    source={getUserImageSource(item, randomDate)}
                  />
                )}
                onPress={() => {
                  if (groupUsers.includes(_id)) {
                    setGroupUsers(prev => prev.filter(id => id !== _id));
                  } else {
                    setGroupUsers(prev => prev.concat(_id));
                  }
                }}
              />
              <Divider />
            </>
          );
        }}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  allUsers: selectAllUsers,
  randomDate: selectRandomDate
});

const mapDispatchToProps = dispatch => ({
  getAllUsersStart: callback => dispatch(getAllUsersStart(callback)),
  createGroupStart: (groupData, callback) =>
    dispatch(createGroupStart(groupData, callback)),
  updateRandomDate: () => dispatch(updateRandomDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);
