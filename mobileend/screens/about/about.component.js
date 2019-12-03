import React from 'react';
import { Image, ScrollView } from 'react-native';
import { Headline, Paragraph, Divider, IconButton } from 'react-native-paper';
import logo from '../../assets/logo.png';

const About = ({ navigation }) => {
  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          marginTop: 30,
          paddingHorizontal: 10,
          alignItems: 'center'
        }}
      >
        <Image source={logo} style={{ width: 300 }} resizeMode="contain" />
        <Headline>WORDY is...</Headline>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam,
          quaerat distinctio earum labore cum obcaecati molestias consectetur
          optio, quibusdam quis veniam id similique quos dolores ad perspiciatis
          tenetur quasi error esse adipisci, atque fugit. Laborum temporibus ab
          omnis, eos sunt quidem perspiciatis eligendi repellat dolor nesciunt
          dignissimos atque quis aliquam.
        </Paragraph>

        <Divider style={{ marginTop: 10 }} />

        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat esse
          impedit, illo minus voluptate ut quos laudantium quis architecto
          totam, ducimus consequuntur et pariatur soluta alias error dolores
          reiciendis. Obcaecati, assumenda vitae! Inventore maiores quaerat
          consequatur nostrum eum velit quam repellat ipsam. Praesentium placeat
          cum maiores incidunt dolores quibusdam, aliquid ducimus. Placeat
          mollitia velit asperiores dicta fugit temporibus consectetur illum
          excepturi numquam ullam, eveniet doloremque vel suscipit eaque vero
          rerum veritatis aut, quis adipisci dolorem reiciendis error unde
          incidunt! Facilis rem sed modi numquam voluptatibus natus iste earum
          pariatur labore officiis suscipit alias, minima rerum velit quo
          aliquam consequatur ea.
        </Paragraph>

        <Divider style={{ marginTop: 10 }} />

        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat esse
          impedit, illo minus voluptate ut quos laudantium quis architecto
          totam, ducimus consequuntur et pariatur soluta alias error dolores
          reiciendis. Obcaecati, assumenda vitae! Inventore maiores quaerat
          consequatur nostrum eum velit quam repellat ipsam. Praesentium placeat
          cum maiores incidunt dolores quibusdam, aliquid ducimus. Placeat
          mollitia velit asperiores dicta fugit temporibus consectetur illum
          excepturi numquam ullam, eveniet doloremque vel suscipit eaque vero
          rerum veritatis aut, quis adipisci dolorem reiciendis error unde
          incidunt! Facilis rem sed modi numquam voluptatibus natus iste earum
          pariatur labore officiis suscipit alias, minima rerum velit quo
          aliquam consequatur ea.
        </Paragraph>

        <Divider style={{ marginTop: 10 }} />

        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat esse
          impedit, illo minus voluptate ut quos laudantium quis architecto
          totam, ducimus consequuntur et pariatur soluta alias error dolores
          reiciendis. Obcaecati, assumenda vitae! Inventore maiores quaerat
          consequatur nostrum eum velit quam repellat ipsam. Praesentium placeat
          cum maiores incidunt dolores quibusdam, aliquid ducimus. Placeat
          mollitia velit asperiores dicta fugit temporibus consectetur illum
          excepturi numquam ullam, eveniet doloremque vel suscipit eaque vero
          rerum veritatis aut, quis adipisci dolorem reiciendis error unde
          incidunt! Facilis rem sed modi numquam voluptatibus natus iste earum
          pariatur labore officiis suscipit alias, minima rerum velit quo
          aliquam consequatur ea.
        </Paragraph>
      </ScrollView>

      <IconButton
        style={{
          position: 'absolute',
          top: 25,
          left: 0,
          backgroundColor: 'white'
        }}
        size={30}
        icon="arrow-left"
        onPress={() => navigation.goBack()}
      />
    </>
  );
};

export default About;
