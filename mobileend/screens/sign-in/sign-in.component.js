import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Paragraph, Button, Headline, Snackbar } from 'react-native-paper';
import { CustomInput } from '../../components';

import { signInUserStart } from '../../redux/current-user/current-user.actions';

const { width } = Dimensions.get('window');

const SignIn = ({ navigation, signInUserStart }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(false);
  const [{ showSnack, snackText }, setSnack] = useState({
    showSnack: false,
    snackText: ''
  });

  const { email, password } = credentials;

  const _handleChange = ({ name, value }) =>
    setCredentials(prev => ({ ...prev, [name]: value.trim() }));

  const _handleSubmit = () => {
    setDisabled(true);
    signInUserStart(email, password, err => {
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
          Existing user
        </Headline>

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
          Sign In
        </Button>

        <Paragraph
          style={{ marginTop: 50, color: 'teal' }}
          onPress={() => navigation.navigate('SignUp')}
        >
          Don't have account ? Create One...
        </Paragraph>

        <Paragraph
          style={{ marginTop: 30, color: 'teal' }}
          onPress={() => navigation.navigate('ForgetPassword')}
        >
          Forget Account Password ? Retrieve...
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
  signInUserStart: (email, password, callback) =>
    dispatch(signInUserStart(email, password, callback))
});

export default connect(null, mapDispatchToProps)(SignIn);
