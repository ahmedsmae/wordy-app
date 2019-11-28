import React from 'react';
import moment from 'moment';
import { View, Dimensions } from 'react-native';
import { Paragraph, IconButton } from 'react-native-paper';

const { width } = Dimensions.get('window');

const MessageCard = ({
  message: { text, owner, createdAt, seen, recieved },
  userId,
  index,
  messages,
  opponents
}) => {
  const mySms = owner === userId;
  const sameUser = index > 0 && owner === messages[index - 1].owner;
  const lastSms = index === messages.length - 1;
  const smsOwnerName = opponents.find(({ _id }) => _id === owner).name;

  return (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 1,
        marginTop: sameUser ? 1 : 10
      }}
    >
      <View
        style={{
          marginLeft: mySms ? 'auto' : null,
          backgroundColor: mySms ? '#d4ffc4' : 'white',
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderTopLeftRadius: !sameUser && !mySms ? 0 : 7,
          borderTopRightRadius: !sameUser && mySms ? 0 : 7,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
          elevation: 1,
          maxWidth: width * 0.8,
          marginBottom: lastSms ? 5 : null
        }}
      >
        {!mySms && !sameUser && (
          <Paragraph
            style={{
              fontSize: 13,
              color: '#ff9b94',
              fontWeight: 'bold',
              lineHeight: 14
            }}
          >
            {smsOwnerName}
          </Paragraph>
        )}

        <Paragraph
          style={{ fontSize: 16, lineHeight: 20, marginRight: mySms ? 80 : 60 }}
        >
          {text}
        </Paragraph>

        <Paragraph
          style={{
            fontSize: 12,
            color: '#8d918c',
            position: 'absolute',
            bottom: 0,
            right: mySms ? 30 : 10
          }}
        >
          {moment(createdAt).format('h:m a')}
        </Paragraph>

        {mySms && (
          <>
            <IconButton
              icon="check"
              size={15}
              color={seen ? '#60bef0' : '#8d918c'}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 10,
                margin: 0
              }}
            />

            {recieved && (
              <IconButton
                icon="check"
                size={15}
                color={seen ? '#60bef0' : '#8d918c'}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 5,
                  margin: 0
                }}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default MessageCard;
