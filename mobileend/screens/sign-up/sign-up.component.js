import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import { Paragraph, Button, Headline, Snackbar } from 'react-native-paper';
import { CustomInput } from '../../components';

import { signUpUserStart } from '../../redux/current-user/current-user.actions';

const { width } = Dimensions.get('window');

const SignUp = ({ navigation, signUpUserStart }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [disabled, setDisabled] = useState(false);
  const [{ showSnack, snackText }, setSnack] = useState({
    showSnack: false,
    snackText: ''
  });

  const { name, email, password, confirmPassword } = credentials;

  const _handleChange = ({ name, value }) =>
    setCredentials(prev => ({ ...prev, [name]: value }));

  const _handleSubmit = () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return Alert.alert(
        'Missing Info',
        'Name, Email and Passwords are required.',
        [{ text: 'OK' }]
      );
    }

    if (password.trim() !== confirmPassword.trim()) {
      return Alert.alert(
        'Unmatch',
        'Password and Confirm Password should be matching.',
        [{ text: 'OK' }]
      );
    }

    setDisabled(true);
    signUpUserStart(name.trim(), email.trim(), password.trim(), err => {
      if (err) {
        setSnack({
          showSnack: true,
          snackText:
            err.response && err.response.data && err.response.data.errors
              ? err.response.data.errors.map(err => err.msg).toString()
              : 'Please check your connection'
        });
        console.log(err);
      }
      setDisabled(false);
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={5}
    >
      <ScrollView contentContainerStyle={styles.screen}>
        <Headline style={{ fontSize: 30, marginBottom: 20 }}>
          Create new user
        </Headline>

        <CustomInput
          style={{ width: width * 0.8, margin: 10 }}
          autoCapitalize="words"
          label="Name"
          name="name"
          value={name}
          onChange={_handleChange}
        />

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
          hint="Password should be at least 7 characters."
        />

        <CustomInput
          style={{ width: width * 0.8, margin: 10 }}
          secureTextEntry
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={_handleChange}
        />

        <Button
          mode="outlined"
          style={{ marginTop: 30, width: 200 }}
          disabled={disabled}
          onPress={_handleSubmit}
        >
          Sign Up
        </Button>

        <Paragraph
          style={{ marginTop: 50, color: 'teal' }}
          onPress={() => navigation.navigate('SignIn')}
        >
          Already have an account ? Sign In...
        </Paragraph>
      </ScrollView>

      <Snackbar
        visible={showSnack}
        onDismiss={() => setSnack({ showSnack: false, snackText: '' })}
        action={{
          label: 'Close',
          onPress: () => setSnack({ showSnack: false, snackText: '' })
        }}
      >
        {snackText}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = dispatch => ({
  signUpUserStart: (name, email, password, callback) =>
    dispatch(signUpUserStart(name, email, password, callback))
});

export default connect(null, mapDispatchToProps)(SignUp);
