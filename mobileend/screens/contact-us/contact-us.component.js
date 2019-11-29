import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView, Alert, Dimensions } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { CustomInput } from '../../components';

import { selectCurrentUser } from '../../redux/current-user/current-user.selectors';
import { contactUsStart } from '../../redux/current-user/current-user.actions';

const { width } = Dimensions.get('window');

const ContactUs = ({ navigation, currentUser, contactUsStart }) => {
  const INITIAL_STATE = {
    email: currentUser ? currentUser.email : '',
    subject: '',
    message: ''
  };
  const [contactData, setContactData] = useState(INITIAL_STATE);
  const { email, subject, message } = contactData;
  const [disabled, setDisabled] = useState(false);

  const _handleChange = ({ name, value }) => {
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const _handleSubmit = () => {
    // valid email
    if (email.length === 0) {
      return Alert.alert(
        'Missing Info',
        'You should include your email address',
        [{ text: 'OK' }]
      );
    }

    setDisabled(true);
    contactUsStart(
      { ...contactData, email: email.toLowerCase().trim() },
      err => {
        if (err) {
          setDisabled(false);
          return console.log(err);
        }

        setContactData(INITIAL_STATE);
        setDisabled(false);
        navigation.goBack();
      }
    );
  };

  return (
    <>
      <Appbar.Header>
        {currentUser && (
          <Appbar.Action
            icon="menu"
            onPress={() => navigation.toggleDrawer()}
          />
        )}
        <Appbar.Content title="Contact US" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <CustomInput
          style={{ width: width * 0.8, margin: 10 }}
          keyboardType="email-address"
          disabled={!!currentUser}
          label="Email"
          value={email}
          name="email"
          onChange={_handleChange}
        />

        <CustomInput
          style={{ width: width * 0.8, margin: 10 }}
          autoCapitalize="sentences"
          label="Subject"
          value={subject}
          name="subject"
          onChange={_handleChange}
        />

        <CustomInput
          style={{ width: width * 0.8, margin: 10 }}
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
          label="Message"
          value={message}
          name="message"
          onChange={_handleChange}
        />

        <Button
          mode="outlined"
          style={{ marginTop: 30, width: 200 }}
          disabled={disabled}
          onPress={_handleSubmit}
        >
          Send Email
        </Button>
      </ScrollView>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  contactUsStart: (contactData, callback) =>
    dispatch(contactUsStart(contactData, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
