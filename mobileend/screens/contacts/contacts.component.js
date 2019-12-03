import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';

import { FlatList } from 'react-native';
import { List, Appbar, Searchbar } from 'react-native-paper';
import { PlaceholderParagraph } from '../../components';

const Con = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]
      });

      setContacts(data);
    };

    loadContacts();
  }, []);

  const displayList = contacts.filter(({ name }) =>
    name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <>
      <Appbar.Header>
        {searchMode ? (
          <Searchbar
            placeholder="Search contact name..."
            value={searchQ}
            autoFocus
            clearButtonMode="always"
            onChangeText={text => {
              setSearchQ(text);
              if (text.length === 0) {
                setSearchMode(false);
              }
            }}
          />
        ) : (
          <>
            <Appbar.BackAction
              color="white"
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content title="Contacts" />
            <Appbar.Action
              icon="magnify"
              color="white"
              onPress={() => setSearchMode(true)}
            />
          </>
        )}
      </Appbar.Header>

      <FlatList
        ListEmptyComponent={() => (
          <PlaceholderParagraph title="There is no contacts with phone numbers on the device" />
        )}
        data={displayList}
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
