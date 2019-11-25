import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import {
  Appbar,
  List,
  IconButton,
  Dialog,
  Portal,
  Divider
} from 'react-native-paper';

const { width } = Dimensions.get('window');

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { editEmployeeInfoStart } from '../../redux/current-user/current-user.actions';

import { APP_URLS } from '../../redux/utils/urls';

const UserProfile = ({
  navigation,
  currentUser: { _id, sign_in_method, image_url, name, email, status },
  editEmployeeInfoStart
}) => {
  const _handlePhotoChange = () => {
    // action
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Profile" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ width: 150, height: 150, borderRadius: 75, margin: 20 }}
            source={{
              uri:
                sign_in_method === 'EMAIL/PASSWORD'
                  ? `${APP_URLS.SERVER_USER_AVATAR.url}/${_id}`
                  : image_url
            }}
          />

          <IconButton
            size={25}
            icon="camera"
            color="white"
            style={{
              width: 45,
              height: 45,
              borderRadius: 23,
              backgroundColor: 'tomato',
              padding: 10,
              position: 'absolute',
              bottom: 20,
              right: width / 2,
              elevation: 3,
              marginRight: -80
            }}
            onPress={_handlePhotoChange}
          />
        </View>

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
          left={props => <List.Icon {...props} icon="account" color="teal" />}
          right={props => (
            <List.Icon {...props} icon="pencil" color="lightgrey" />
          )}
          onPress={() => {}}
        />

        <Divider style={{ marginLeft: 90 }} />

        <List.Item
          style={{ paddingLeft: 25, paddingRight: 20, paddingVertical: 10 }}
          titleStyle={{ fontSize: 14, color: 'grey' }}
          descriptionStyle={{ fontSize: 16, color: 'black' }}
          title="Status"
          description={status}
          left={props => (
            <List.Icon {...props} icon="message-text-outline" color="teal" />
          )}
          right={props => (
            <List.Icon {...props} icon="pencil" color="lightgrey" />
          )}
          onPress={() => {}}
        />

        <Divider style={{ marginLeft: 90 }} />

        <List.Item
          style={{ paddingLeft: 25, paddingVertical: 10 }}
          titleStyle={{ fontSize: 14, color: 'grey' }}
          descriptionStyle={{ fontSize: 16, color: 'black' }}
          title="Email"
          description={email}
          left={props => (
            <List.Icon {...props} icon="email-outline" color="teal" />
          )}
        />
      </ScrollView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  editEmployeeInfoStart: (userInfo, callback) =>
    dispatch(editEmployeeInfoStart(userInfo, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
