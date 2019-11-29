import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Alert, Dimensions } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { CustomInput } from '../../components';

import { forgetUserPasswordStart } from '../../redux/current-user/current-user.actions';

const { width } = Dimensions.get('window');

const ForgetPassword = ({ navigation, forgetUserPasswordStart }) => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  const _handleSubmit = () => {
    setDisabled(true);
    forgetUserPasswordStart(email, err => {
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
        <Appbar.Content title="Forget Password" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <CustomInput
          style={{ width: width * 0.8, margin: 10 }}
          keyboardType="email-address"
          label="Email"
          value={email}
          onChange={({ value }) => setEmail(value)}
        />

        <Button
          mode="outlined"
          style={{ marginTop: 30, width: 200 }}
          disabled={disabled}
          onPress={_handleSubmit}
        >
          Send New Password
        </Button>
      </ScrollView>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  forgetUserPasswordStart: (email, callback) =>
    dispatch(forgetUserPasswordStart(email, callback))
});

export default connect(null, mapDispatchToProps)(ForgetPassword);
