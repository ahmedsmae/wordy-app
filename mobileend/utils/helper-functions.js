import { APP_URLS } from '../redux/utils/urls';
import userBlankImage from '../assets/user.png';
import groupBlankImage from '../assets/group.png';

export const getChatImageSource = (chat, opponent, randomDate) => {
  switch (true) {
    case chat && chat.group && chat.image_uploaded:
      return {
        uri: `${APP_URLS.SERVE_CHAT_AVATAR.url}/${chat._id}?r=${randomDate}`
      };

    case chat && chat.group && !chat.image_uploaded:
      return groupBlankImage;

    case (!chat || !chat.group) && opponent.image_uploaded:
      return {
        uri: `${APP_URLS.SERVE_USER_AVATAR.url}/${opponent._id}?r=${randomDate}`
      };

    case (!chat || !chat.group) &&
      !opponent.image_uploaded &&
      opponent.sign_in_method === 'EMAIL/PASSWORD':
      return userBlankImage;

    case (!chat || !chat.group) &&
      !opponent.image_uploaded &&
      opponent.sign_in_method !== 'EMAIL/PASSWORD':
      return { uri: opponent.image_url };

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
    imageSource = { uri: image_url };
  }

  return imageSource;
};

export const calcDesiredWidthHeight = (
  originalWidth,
  originalHeight,
  maxWidth,
  maxHeight
) => {
  let desiredWidth, desiredHeight;

  if (originalWidth > maxWidth) {
    desiredWidth = maxWidth;
    desiredHeight = (originalHeight * maxWidth) / originalWidth;
  } else if (originalHeight > maxHeight) {
    desiredHeight = maxHeight;
    desiredWidth = (originalWidth * maxHeight) / originalHeight;
  } else {
    desiredWidth = originalWidth;
    desiredHeight = originalHeight;
  }

  return { width: desiredWidth, height: desiredHeight };
};
