import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import {
  Title,
  Button,
  Paragraph,
  IconButton,
  Headline
} from 'react-native-paper';

import { selectAppWizardData } from '../../redux/constants/constants.selectors';

const { width } = Dimensions.get('window');

const AppWizard = ({ navigation, appWizardData }) => {
  const _handleFinish = () => {
    AsyncStorage.setItem('WIZARD_DISPLAYED', 'DISPLAYED', err =>
      console.log(err)
    );
    navigation.navigate('SignInOptions');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {appWizardData.map(
          ({ id, title, description, imageUrl, bgColor, textColor }, index) => (
            <View
              key={id}
              style={{
                width,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
                backgroundColor: bgColor
              }}
            >
              <Image
                resizeMode="stretch"
                style={{
                  width: 200,
                  height: 300,
                  marginBottom: 50,
                  marginTop: -100
                }}
                source={imageUrl}
              />
              <Headline style={{ color: textColor }}>{title}</Headline>

              <Paragraph
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  marginTop: 20,
                  color: textColor
                }}
              >
                {description}
              </Paragraph>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  {index !== 0 && (
                    <IconButton
                      icon="less-than"
                      size={30}
                      color={textColor}
                      style={{ padding: 10 }}
                    />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  {index !== appWizardData.length - 1 && (
                    <Button
                      labelStyle={{ fontSize: 16, color: textColor }}
                      onPress={_handleFinish}
                    >
                      Skip
                    </Button>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  {index !== appWizardData.length - 1 ? (
                    <IconButton
                      icon="greater-than"
                      size={30}
                      color={textColor}
                      style={{ padding: 10 }}
                    />
                  ) : (
                    <Button
                      labelStyle={{ fontSize: 16, color: textColor }}
                      onPress={_handleFinish}
                    >
                      Start
                    </Button>
                  )}
                </View>
              </View>
            </View>
          )
        )}
      </ScrollView>
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

const mapStateToProps = createStructuredSelector({
  appWizardData: selectAppWizardData
});

export default connect(mapStateToProps)(AppWizard);
