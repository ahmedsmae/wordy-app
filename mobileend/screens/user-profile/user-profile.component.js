import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { Appbar, List, Portal, Divider } from 'react-native-paper';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { selectRandomDate } from '../../redux/api-utilities/api-utilities.selectors';
import { updateRandomDate } from '../../redux/api-utilities/api-utilities.actions';
import {
  updateUserAvatarStart,
  updateUserInfoStart
} from '../../redux/current-user/current-user.actions';

import EditDialog from './edit-dialog.component';
import ImagePicker from './image-picker.component';
import Colors from '../../utils/colors';

const UserProfile = ({
  navigation,
  currentUser,
  updateUserAvatarStart,
  updateUserInfoStart,
  randomDate,
  updateRandomDate
}) => {
  const { _id, sign_in_method, image_url, email, image_uploaded } = currentUser;

  const [name, setName] = useState(currentUser.name || '');
  const [status, setStatus] = useState(currentUser.status || '');

  const [editingName, setEditingName] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flex: 1 }}
        >
          <ImagePicker
            currentUser={currentUser}
            randomDate={randomDate}
            onImageTaken={image =>
              updateUserAvatarStart(image, err => {
                if (err) {
                }
                updateRandomDate();
              })
            }
          />

          <List.Item
            style={{
              paddingLeft: 25,
              paddingVertical: 10,
              paddingRight: 20,
              marginTop: 30
            }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            descriptionStyle={{ fontSize: 16, color: 'black' }}
            title="Name"
            description={name}
            left={props => (
              <List.Icon {...props} icon="account" color={Colors.PRIMARY} />
            )}
            right={props => (
              <List.Icon {...props} icon="pencil" color="lightgrey" />
            )}
            onPress={() => setEditingName(true)}
          />

          <Divider style={{ marginLeft: 90 }} />

          <List.Item
            style={{ paddingLeft: 25, paddingRight: 20, paddingVertical: 10 }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            descriptionStyle={{ fontSize: 16, color: 'black' }}
            title="Status"
            description={status}
            left={props => (
              <List.Icon
                {...props}
                icon="message-text-outline"
                color={Colors.PRIMARY}
              />
            )}
            right={props => (
              <List.Icon {...props} icon="pencil" color="lightgrey" />
            )}
            onPress={() => setEditingStatus(true)}
          />

          <Divider style={{ marginLeft: 90 }} />

          <List.Item
            style={{ paddingLeft: 25, paddingVertical: 10 }}
            titleStyle={{ fontSize: 14, color: 'grey' }}
            descriptionStyle={{ fontSize: 16, color: 'black' }}
            title="Email"
            description={email}
            left={props => (
              <List.Icon
                {...props}
                icon="email-outline"
                color={Colors.PRIMARY}
              />
            )}
          />

          <Portal>
            <EditDialog
              title="Edit Name"
              value={name}
              visible={editingName}
              onDismiss={() => setEditingName(false)}
              onChangeText={text => setName(text)}
              onSave={() => {
                setEditingName(false);
                updateUserInfoStart({ name, status }, err => {});
              }}
            />

            <EditDialog
              title="Edit Status"
              value={status}
              visible={editingStatus}
              onDismiss={() => setEditingStatus(false)}
              onChangeText={text => setStatus(text)}
              onSave={() => {
                setEditingStatus(false);
                updateUserInfoStart({ name, status }, err => {});
              }}
            />
          </Portal>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  randomDate: selectRandomDate
});

const mapDispatchToProps = dispatch => ({
  updateUserAvatarStart: (avatar, callback) =>
    dispatch(updateUserAvatarStart(avatar, callback)),
  updateUserInfoStart: (userInfo, callback) =>
    dispatch(updateUserInfoStart(userInfo, callback)),
  updateRandomDate: () => dispatch(updateRandomDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
