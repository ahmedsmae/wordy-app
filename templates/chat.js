const chat = {
  _id: '',
  opponents: ['1st user id', '2nd user id'],
  admin: 'user id',
  name: '',
  status: '',
  group: Boolean,
  avatar: 'Binary',
  image_uploaded: Boolean,
  messages: [
    {
      _id: '',
      owner: 'user id',
      text: '',
      attachment: {
        kind: 'IMAGE/DOCUMENT/AUDIO/CONATCT/LINK/LOCATION',
        url: 'if link',
        location: 'if location',
        file: 'if image, doc, audio or contact'
      },
      seen: 'false/true',
      createdAt: 'DATE'
    }
  ],
  timestamp
};
