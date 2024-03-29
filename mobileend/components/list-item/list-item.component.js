import React from 'react';
import { Paragraph, Divider, Avatar, List } from 'react-native-paper';

const ListItem = ({ imageSource, title, subtitle, time, onPress }) => {
  return (
    <>
      <List.Item
        titleStyle={{ fontSize: 18 }}
        title={title}
        titleNumberOfLines={1}
        description={subtitle}
        descriptionNumberOfLines={1}
        left={props => (
          <Avatar.Image
            {...props}
            style={{ marginHorizontal: 5 }}
            size={60}
            source={imageSource}
          />
        )}
        onPress={onPress}
      />
      <Divider style={{ marginLeft: 80, marginRight: 10 }} />
      <Paragraph
        style={{ position: 'absolute', top: 16, right: 10, fontSize: 13 }}
      >
        {time}
      </Paragraph>
    </>
  );
};

export default ListItem;
