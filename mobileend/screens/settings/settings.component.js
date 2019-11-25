import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyleSheet } from 'react-native';
import { Appbar, List, Paragraph, Divider, Avatar } from 'react-native-paper';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { signoutUserStart } from '../../redux/current-user/current-user.actions';

import { APP_URLS } from '../../redux/utils/urls';

const Settings = ({ navigation, currentUser, signoutUserStart }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <List.Item
        style={{ paddingVertical: 20 }}
        titleStyle={{ fontSize: 20 }}
        title={currentUser.name}
        description={currentUser.status}
        left={props => (
          <Avatar.Image
            {...props}
            style={{ marginHorizontal: 15 }}
            size={70}
            source={{
              uri:
                currentUser.sign_in_method === 'EMAIL/PASSWORD'
                  ? `${APP_URLS.SERVER_USER_AVATAR.url}/${currentUser._id}`
                  : currentUser.image_url
            }}
          />
        )}
        onPress={() => navigation.navigate('UserProfile')}
      />

      <Divider />

      <List.Item
        style={{ paddingLeft: 25, paddingVertical: 10 }}
        title="User Agreement"
        description="Item description"
        left={props => (
          <List.Icon {...props} icon="thumb-up-outline" color="teal" />
        )}
        onPress={() => navigation.navigate('')}
      />

      <List.Item
        style={{ paddingLeft: 25, paddingVertical: 10 }}
        title="Sign Out"
        description="Item description"
        left={props => <List.Icon {...props} icon="exit-to-app" color="teal" />}
        onPress={() => signoutUserStart(err => {})}
      />

      <List.Item
        style={{ paddingLeft: 25, paddingVertical: 10 }}
        title="Change Password"
        description="Item description"
        left={props => (
          <List.Icon {...props} icon="find-replace" color="teal" />
        )}
        onPress={() => navigation.navigate('')}
      />

      <List.Item
        style={{ paddingLeft: 25, paddingVertical: 10 }}
        title="About"
        description="Item description"
        left={props => (
          <List.Icon {...props} icon="information-outline" color="teal" />
        )}
        onPress={() => navigation.navigate('')}
      />

      <Paragraph
        style={{
          color: 'grey',
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 15,
          textAlign: 'center'
        }}
      >
        WordyApp by Ahmed Afifi
      </Paragraph>
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
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signoutUserStart: callback => dispatch(signoutUserStart(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
