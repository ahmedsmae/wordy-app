import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  ScrollView,
  Picker,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import {
  Appbar,
  Button,
  Divider,
  Title,
  Paragraph,
  TextInput
} from 'react-native-paper';
import { CustomInput } from '../../components';

import { selectDeleteUserReasons } from '../../redux/constants/constants.selectors';
import { deleteUserStart } from '../../redux/current-user/current-user.actions';

const { width } = Dimensions.get('window');

const DeleteUser = ({ navigation, deleteUserReasons, deleteUserStart }) => {
  const [deleteData, setDeleteData] = useState({
    reason: deleteUserReasons[0],
    details: '',
    email: '',
    password: ''
  });
  const { reason, details, email, password } = deleteData;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) => {
    setDeleteData(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    setDisabled(true);
    deleteUserStart(
      { ...deleteData, email: email.toLowerCase().trim() },
      err => {
        if (err) {
          setDisabled(false);
          return console.log(err);
        }

        setDisabled(false);
        navigation.goBack();
      }
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Delete User" />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={5}
      >
        <ScrollView style={{ marginHorizontal: 10 }}>
          <Title>We are sorry to see you here :(</Title>
          <Paragraph>
            It will be great if you can tell us why you consider leaving our
            service
          </Paragraph>

          <View
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: 'grey'
            }}
          >
            <Picker
              selectedValue={reason}
              onValueChange={_handleChange.bind(this, 'reason')}
            >
              {deleteUserReasons.map((reason, index) => (
                <Picker.Item key={index} label={reason} value={reason} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={{ backgroundColor: 'white' }}
            multiline
            mode="outlined"
            numberOfLines={3}
            label="Details"
            value={details}
            onChangeText={text =>
              setDeleteData(prev => ({ ...prev, details: text }))
            }
          />

          <Divider style={{ marginTop: 10 }} />

          <Title style={{ marginLeft: 10 }}>Sign in</Title>
          <Paragraph style={{ marginLeft: 10 }}>
            Signing in is required to delete user
          </Paragraph>

          <View style={{ alignItems: 'center' }}>
            <CustomInput
              style={{ width: width * 0.8, margin: 10 }}
              keyboardType="email-address"
              label="Email"
              name="email"
              value={email}
              onChange={_handleChange}
            />

            <CustomInput
              style={{ width: width * 0.8, margin: 10 }}
              secureTextEntry
              label="Password"
              name="password"
              value={password}
              onChange={_handleChange}
            />

            <Button
              mode="outlined"
              style={{ marginTop: 30, width: 200 }}
              disabled={disabled}
              onPress={_handleSubmit}
            >
              Delete User
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  deleteUserReasons: selectDeleteUserReasons
});

const mapDiapatchToProps = dispatch => ({
  deleteUserStart: (deleteData, callback) =>
    dispatch(deleteUserStart(deleteData, callback))
});

export default connect(mapStateToProps, mapDiapatchToProps)(DeleteUser);
