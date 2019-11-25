import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Title, Headline, Card } from 'react-native-paper';

import {
  signInWithFacebookStart,
  signInWithGoogleStart
} from '../../redux/current-user/current-user.actions';

const { width } = Dimensions.get('window');
const GOOGLE_ANDROID_CLIENT_ID =
  '922862379273-cqcss1nqg5dp6ins7aqmf4r08botssk7.apps.googleusercontent.com';

const SignInOptions = ({
  navigation,
  signInWithFacebookStart,
  signInWithGoogleStart
}) => {
  return (
    <View style={styles.screen}>
      <Headline style={{ fontSize: 30, marginBottom: 20 }}>Sign In</Headline>
      <Card
        style={{ margin: 10, height: 60, backgroundColor: 'lightblue' }}
        onPress={() => signInWithFacebookStart(err => {})}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'center',
            width: width * 0.8
          }}
        >
          <Image
            source={require('../../assets/facebook-logo.png')}
            style={{ width: 17, height: 40, marginRight: 20 }}
          />
          <Title style={{ color: '#3B5998' }}>Sign in with Facebook</Title>
        </View>
      </Card>

      <Card
        style={{ margin: 10, height: 60, backgroundColor: 'pink' }}
        onPress={() => signInWithGoogleStart(err => {})}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'center',
            width: width * 0.8
          }}
        >
          <Image
            source={require('../../assets/google-logo.png')}
            style={{ width: 40, height: 40, marginRight: 20 }}
          />
          <Title style={{ color: '#3B5998' }}>Sign in with Google</Title>
        </View>
      </Card>

      <Card
        style={{ margin: 10, height: 60, backgroundColor: 'lightgrey' }}
        onPress={() => navigation.navigate('SignIn')}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'center',
            width: width * 0.8
          }}
        >
          <Image
            source={require('../../assets/password-logo.png')}
            style={{ width: 40, height: 40, marginRight: 20 }}
          />
          <Title style={{ color: '#3B5998' }}>Sign in with Email/Pass</Title>
        </View>
      </Card>
    </View>
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
  signInWithFacebookStart: callback =>
    dispatch(signInWithFacebookStart(callback)),
  signInWithGoogleStart: callback => dispatch(signInWithGoogleStart(callback))
});

export default connect(null, mapDispatchToProps)(SignInOptions);
