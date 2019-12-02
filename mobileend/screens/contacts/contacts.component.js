import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';

import { FlatList } from 'react-native';
import { List, Appbar } from 'react-native-paper';
import { PlaceholderParagraph } from '../../components';

const Con = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const loadContacts = async () => {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
      });

      setContacts(data);
    };

    loadContacts();
  }, []);
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Chatting')} />
        <Appbar.Content title="Contacts" />
      </Appbar.Header>

      <FlatList
        ListEmptyComponent={() => (
          <PlaceholderParagraph title="There is no contacts with phone numbers on the device" />
        )}
        data={contacts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => {
          const { name, phoneNumbers } = item;

          return (
            phoneNumbers &&
            !!phoneNumbers.length && (
              <List.Item
                title={name}
                description={
                  phoneNumbers &&
                  !!phoneNumbers.length &&
                  phoneNumbers.map(({ number }) => number).join(', ')
                }
                onPress={() =>
                  navigation.navigate('Chatting', { contact: item })
                }
              />
            )
          );
        }}
      />
    </>
  );
};

export default Con;
