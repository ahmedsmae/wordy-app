import { APP_URLS } from '../redux/utils/urls';

export const getChatImageSource = (chat, opponent) => {
  const { _id, image_uploaded, sign_in_method, image_url } = opponent;

  switch (true) {
    case chat.group && chat.image_uploaded:
      // ! serve chat avatar
      return `${APP_URLS.SERVER_USER_AVATAR}/${chat._id}`;

    case chat.group && !chat.image_uploaded:
      return null;
      return `default group image`;

    case !chat.group && image_uploaded:
      return `${APP_URLS.SERVER_USER_AVATAR}/${_id}`;

    case !chat.group && !image_uploaded && sign_in_method === 'EMAIL/PASSWORD':
      return null;
      return `default user image`;

    case !chat.group && !image_uploaded && sign_in_method != 'EMAIL/PASSWORD':
      return image_url;

    default:
      return null;
  }
};

export const getOpponent = (opponents, userId) =>
  opponents.find(({ _id }) => _id !== userId);
