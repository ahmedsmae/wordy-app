import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Alert } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { CustomInput } from '../../components';

import { changeUserPasswordStart } from '../../redux/current-user/current-user.actions';

const ChangePassword = ({ navigation, changeUserPasswordStart }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const { oldPassword, newPassword, confirmNewPassword } = passwords;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) => {
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    if (newPassword !== confirmNewPassword) {
      return Alert.alert(
        'Input Error',
        '"New Password" and "Confirm New Password" should be same',
        [{ text: 'OK' }]
      );
    }

    setDisabled(true);
    changeUserPasswordStart({ oldPassword, newPassword }, err => {
      if (err) {
        setDisabled(false);
        return console.log(err);
      }

      setDisabled(false);
      navigation.goBack();
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Change Password" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <CustomInput
          style={{ margin: 10 }}
          label="Old Password"
          secureTextEntry
          value={oldPassword}
          name="oldPassword"
          onChange={_handleChange}
        />

        <CustomInput
          style={{ margin: 10 }}
          label="New Password"
          secureTextEntry
          value={newPassword}
          name="newPassword"
          onChange={_handleChange}
        />

        <CustomInput
          style={{ margin: 10 }}
          label="Confirm New Password"
          secureTextEntry
          value={confirmNewPassword}
          name="confirmNewPassword"
          onChange={_handleChange}
        />

        <Button
          mode="outlined"
          style={{ marginTop: 30, width: 200 }}
          disabled={disabled}
          onPress={_handleSubmit}
        >
          Change Password
        </Button>
      </ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  changeUserPasswordStart: (passwords, callback) =>
    dispatch(changeUserPasswordStart(passwords, callback))
});

export default connect(null, mapDispatchToProps)(ChangePassword);
