import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Title } from 'react-native-paper';

const PlaceholderParagraph = ({ title, subtitle, caption }) => {
  return (
    <View style={styles.container}>
      {!!title && <Title style={styles.text}>{title}</Title>}
      {!!subtitle && <Paragraph style={styles.text}>{subtitle}</Paragraph>}
      {!!caption && <Paragraph style={styles.text}>{caption}</Paragraph>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 200,
    paddingHorizontal: 30
  },
  text: {
    color: 'grey',
    textAlign: 'center'
  }
});
export default PlaceholderParagraph;
