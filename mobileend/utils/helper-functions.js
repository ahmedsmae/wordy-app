import { APP_URLS } from '../redux/utils/urls';
import userBlankImage from '../assets/user.png';
import groupBlankImage from '../assets/group.png';

export const getChatImageSource = (chat, opponent, randomDate) => {
  const { _id, image_uploaded, sign_in_method, image_url } = opponent;

  switch (true) {
    case chat.group && chat.image_uploaded:
      return {
        uri: `${APP_URLS.SERVE_CHAT_AVATAR.url}/${chat._id}?r=${randomDate}`
      };

    case chat.group && !chat.image_uploaded:
      return groupBlankImage;

    case !chat.group && image_uploaded:
      return {
        uri: `${APP_URLS.SERVE_USER_AVATAR.url}/${_id}?r=${randomDate}`
      };

    case !chat.group && !image_uploaded && sign_in_method === 'EMAIL/PASSWORD':
      return userBlankImage;

    case !chat.group && !image_uploaded && sign_in_method !== 'EMAIL/PASSWORD':
      return { uri: image_url };

    default:
      return null;
  }
};

export const getOpponent = (opponents, userId) =>
  opponents.find(({ _id }) => _id !== userId);

export const getUserImageSource = (user, randomDate) => {
  const { image_uploaded, _id, sign_in_method, image_url } = user;

  let imageSource;
  if (image_uploaded) {
    imageSource = {
      uri: `${APP_URLS.SERVE_USER_AVATAR.url}/${_id}?r=${randomDate}`
    };
  } else if (sign_in_method === 'EMAIL/PASSWORD') {
    imageSource = userBlankImage;
  } else {
    imageSource = image_url;
  }

  return imageSource;
};
